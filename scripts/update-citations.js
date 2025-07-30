import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateCitations() {
  console.log('🚀 Starting citation update...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // For GitHub Actions
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📄 Navigating to Google Scholar...');
    await page.goto('https://scholar.google.com/citations?user=FPx_wTQAAAAJ&hl=en', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('🔍 Extracting citation data...');
    const scholarData = await page.evaluate(() => {
      const papers = [];
      
      // Get total citations from the sidebar
      const totalCitationsElement = document.querySelector("#gsc_rsb_st > tbody > tr:nth-child(1) > td:nth-child(2)");
      const totalCitations = totalCitationsElement ? parseInt(totalCitationsElement.textContent.trim()) || 0 : 0;
      
      console.log(`Total citations from sidebar: ${totalCitations}`);
      
      // Get individual papers
      let rowIndex = 1;
      
      while (true) {
        try {
          const row = document.querySelector(`#gsc_a_b > tr:nth-child(${rowIndex})`);
          if (!row) {
            console.log(`No more rows found at index ${rowIndex}`);
            break;
          }
          
          const titleElement = row.querySelector('td.gsc_a_t a');
          const citationElement = row.querySelector('td.gsc_a_c a');
          
          if (titleElement && citationElement) {
            const title = titleElement.textContent.trim();
            const citationText = citationElement.textContent.trim();
            const citations = parseInt(citationText) || 0;
            
            papers.push({
              title,
              citations,
              originalCitationText: citationText,
              rowIndex
            });
            
            console.log(`Paper ${rowIndex}: "${title.substring(0, 50)}..." - ${citations} citations`);
          } else if (titleElement) {
            // Paper with 0 citations (no citation link)
            const title = titleElement.textContent.trim();
            papers.push({
              title,
              citations: 0,
              originalCitationText: "0",
              rowIndex
            });
            console.log(`Paper ${rowIndex}: "${title.substring(0, 50)}..." - 0 citations (no link)`);
          }
          
          rowIndex++;
          
          // Safety limit to prevent infinite loops
          if (rowIndex > 100) {
            console.log(`Safety limit reached at ${rowIndex} papers`);
            break;
          }
        } catch (e) {
          console.log(`Error at row ${rowIndex}: ${e.message}`);
          break;
        }
      }
      
      // Check if there's a "Show more" button
      const showMoreButton = document.querySelector('#gsc_bpf_more');
      if (showMoreButton && !showMoreButton.disabled) {
        console.log(`Found "Show more" button - there are additional papers not loaded`);
      }
      
      return {
        papers,
        totalCitations,
        scrapedTotal: papers.reduce((sum, paper) => sum + paper.citations, 0)
      };
    });
    
    console.log(`📊 Extracted ${scholarData.papers.length} papers from Scholar`);
    console.log(`📈 Total citations from sidebar: ${scholarData.totalCitations}`);
    console.log(`🔢 Sum of individual papers: ${scholarData.scrapedTotal}`);
    
    if (Math.abs(scholarData.totalCitations - scholarData.scrapedTotal) > 2) {
      console.log(`⚠️  Warning: Total citations (${scholarData.totalCitations}) doesn't match sum of papers (${scholarData.scrapedTotal})`);
      console.log(`    This might indicate pagination or hidden papers. Using sidebar total (${scholarData.totalCitations}) as authoritative.`);
    }
    
    scholarData.papers.forEach(paper => {
      console.log(`  - "${paper.title.substring(0, 60)}...": ${paper.citations} citations`);
    });
    
    // Read current publications
    const publicationsPath = path.join(__dirname, '..', 'src', 'content', 'scholar-publications.json');
    const publicationsData = JSON.parse(fs.readFileSync(publicationsPath, 'utf8'));
    
    console.log(`📚 Current publications in JSON: ${publicationsData.publications.length}`);
    
    let updated = false;
    const updates = [];
    const usedScholarPapers = new Set();
    
    // If publications array is empty, populate it from Scholar data
    if (publicationsData.publications.length === 0) {
      console.log('📝 Empty publications array detected. Populating from Scholar data...');
      
      scholarData.papers.forEach((paper, index) => {
        const newPub = {
          id: index + 1,
          title: paper.title,
          authors: "Authors from Scholar", // You'd need to scrape this separately
          journal: "Journal from Scholar", // You'd need to scrape this separately  
          year: "Year from Scholar", // You'd need to scrape this separately
          type: "Journal Article",
          status: "Published",
          citations: paper.citations,
          doi: "", // You'd need to scrape this separately
          description: `Publication found on Google Scholar with ${paper.citations} citations.`
        };
        
        publicationsData.publications.push(newPub);
        updates.push({
          title: newPub.title.substring(0, 50) + '...',
          oldCitations: 0,
          newCitations: paper.citations,
          scholarTitle: paper.title.substring(0, 50) + '...'
        });
      });
      
      updated = true;
      console.log(`✅ Created ${scholarData.papers.length} new publications from Scholar data`);
    } else {
      // Create a mapping to avoid duplicate matches
      const usedPapers = new Set();
      
      // Update citations by matching titles
      scholarData.papers.forEach((scholarPaper, scholarIndex) => {
      const matchedPaper = publicationsData.publications.find(pub => {
        // Skip if this paper was already matched
        if (usedPapers.has(pub.id)) return false;
        
        const cleanScholar = scholarPaper.title.toLowerCase().replace(/[^\w\s]/g, '');
        const cleanPub = pub.title.toLowerCase().replace(/[^\w\s]/g, '');
        
        console.log(`\n🔍 Trying to match:`);
        console.log(`  Scholar: "${scholarPaper.title.substring(0, 60)}..."`);
        console.log(`  JSON: "${pub.title.substring(0, 60)}..."`);
        
        // Strategy 1: Direct substring match (most reliable)
        if (cleanScholar.includes(cleanPub.substring(0, 30)) || cleanPub.includes(cleanScholar.substring(0, 30))) {
          console.log(`  ✅ Matched via substring`);
          return true;
        }
        
        // Strategy 2: First 4 significant words must match exactly
        const scholarWords = cleanScholar.split(' ').filter(w => w.length > 3);
        const pubWords = cleanPub.split(' ').filter(w => w.length > 3);
        
        const scholarStart = scholarWords.slice(0, 4);
        const pubStart = pubWords.slice(0, 4);
        
        const exactMatches = scholarStart.filter(word => pubStart.includes(word));
        if (exactMatches.length >= 3) {
          console.log(`  ✅ Matched via first words: ${exactMatches.join(', ')}`);
          return true;
        }
        
        console.log(`  ❌ No match found`);
        return false;
      });
      
      if (matchedPaper && !usedScholarPapers.has(scholarIndex)) {
        usedScholarPapers.add(scholarIndex);
        usedPapers.add(matchedPaper.id); // Mark this JSON paper as used
        
        if (matchedPaper.citations !== scholarPaper.citations) {
          updates.push({
            title: matchedPaper.title.substring(0, 50) + '...',
            oldCitations: matchedPaper.citations,
            newCitations: scholarPaper.citations,
            scholarTitle: scholarPaper.title.substring(0, 50) + '...'
          });
          matchedPaper.citations = scholarPaper.citations;
          updated = true;
        }
        console.log(`✅ Successfully matched and updated`);
        } else if (!matchedPaper) {
          console.log(`⚠️  Could not match Scholar paper: "${scholarPaper.title.substring(0, 50)}..."`);
        }
      });
    }
    
    // Update metrics using Scholar's total citations (more accurate)
    const finalTotalCitations = scholarData.totalCitations;
    
    if (updated || publicationsData.metrics.totalCitations !== finalTotalCitations) {
      const citedPapers = publicationsData.publications.filter(p => p.citations > 0);
      const sortedCitations = citedPapers.map(p => p.citations).sort((a, b) => b - a);
      
      let hIndex = 0;
      for (let i = 0; i < sortedCitations.length; i++) {
        if (sortedCitations[i] >= i + 1) hIndex = i + 1;
        else break;
      }
      
      const i10Index = sortedCitations.filter(c => c >= 10).length;
      
      publicationsData.metrics = {
        totalCitations: finalTotalCitations,
        hIndex,
        i10Index,
        publications: publicationsData.publications.length
      };
      
      // Add timestamp
      publicationsData.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(publicationsPath, JSON.stringify(publicationsData, null, 2) + '\n');
      
      console.log('\n✅ Citation update completed!');
      if (updates.length > 0) {
        console.log('📈 Updated papers:');
        updates.forEach(update => {
          console.log(`  - ${update.title}: ${update.oldCitations} → ${update.newCitations}`);
          console.log(`    Matched with Scholar: "${update.scholarTitle}"`);
        });
      }
      console.log(`📊 New metrics: ${finalTotalCitations} total citations, h-index: ${hIndex}, i10-index: ${i10Index}`);
    } else {
      console.log('✅ No citation changes detected');
    }
    
  } catch (error) {
    console.error('❌ Error updating citations:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateCitations().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

export { updateCitations };