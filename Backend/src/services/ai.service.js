const { GoogleGenerativeAI } = require("@google/generative-ai");
const puppeteer = require("puppeteer");

// Initialize the Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

/**
 * Generates the Interview Strategy Report
 */
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  // Use the most stable flash model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Note: Ensure your version supports 2.0/2.5 as released
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `
    You are a professional Career Coach and Data-Parsing API. 
    Analyze the Job Description, Resume, and Self Description below.

    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}

    CRITICAL OUTPUT RULES:
    1. Return ONLY a raw JSON object. 
    2. Do NOT include markdown backticks (e.g., no \`\`\`json).
    3. The response MUST start with '{' and end with '}'.
    4. Use EXACTLY the keys shown in the template below.

    CONTENT REQUIREMENTS:
    - QUESTIONS: You MUST generate exactly 7 Technical Questions and exactly 7 Behavioral Questions.
    - ADAPTIVE ROADMAP: Calculate the Match Score first. 
        * If Match Score is HIGH (90%+), generate a 3-day intensive roadmap.
        * If Match Score is MEDIUM (60-89%), generate a 5-day roadmap.
        * If Match Score is LOW (<60%), generate a full 7-day comprehensive roadmap.
        * Minimum roadmap is 3 days, Maximum is 7 days.

    {
      "title": "",
      "matchScore": 0,
      "technicalQuestions": [
        { "question": "", "intention": "", "answer": "" }
      ],
      "behavioralQuestions": [
        { "question": "", "intention": "", "answer": "" }
      ],
      "skillGaps": [
        { "skill": "", "severity": "" }
      ],
      "preparationPlan": [
        { "day": 1, "focus": "", "tasks": [""] }
      ]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  // ROBUST JSON CLEANING: Finds the first { and last } to ignore any stray AI text
  const startJson = text.indexOf('{');
  const endJson = text.lastIndexOf('}');
  if (startJson !== -1 && endJson !== -1) {
    text = text.substring(startJson, endJson + 1);
  }

  return JSON.parse(text);
}

/**
 * Handles HTML to PDF conversion using cloud-optimized Puppeteer
 */
async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();

  // Set content with no timeout for slow cloud servers
  await page.setContent(htmlContent, {
    waitUntil: 'domcontentloaded',
    timeout: 0
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    timeout: 0
  });

  await browser.close();
  return pdfBuffer;
}

/**
 * Generates a tailored Resume PDF
 */
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `
    You are a professional Resume Designer. Create a one-page resume HTML.
    
    Data: ${resume}
    Goal: Tailor for ${jobDescription}

    INSTRUCTIONS:
    1. Return ONLY a JSON object with a single key "html".
    2. Do not use markdown tags.
    3. The HTML should be formatted using the following CSS guidelines for a Times New Roman professional look.

    <style>
      @page { size: A4; margin: 12mm 15mm; }
      body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.4; margin: 0; padding: 0; font-size: 12px; }
      .resume-container { width: 100%; }
      .header h1 { font-size: 32px; margin: 0 0 8px 0; font-weight: bold; }
      .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4px 20px; margin-bottom: 15px; }
      .section-title { font-size: 15px; font-weight: bold; text-transform: uppercase; border-bottom: 2.5px solid #000; margin-top: 15px; }
      .item-row { display: grid; grid-template-columns: 140px 1fr; gap: 20px; margin-top: 10px; }
    </style>
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  // Clean the JSON
  const startJson = text.indexOf('{');
  const endJson = text.lastIndexOf('}');
  const cleanedJson = text.substring(startJson, endJson + 1);

  const parsedJson = JSON.parse(cleanedJson);

  // Wrap the content to ensure the layout is applied
  const fullHtml = `
    <html>
      <head>
        <style>
          @page { size: A4; margin: 12mm 15mm; }
          body { font-family: 'Times New Roman', Times, serif; font-size: 12px; }
          .resume-container { width: 100%; }
        </style>
      </head>
      <body>
        <div class="resume-container">${parsedJson.html}</div>
      </body>
    </html>
  `;

  return await generatePdfFromHtml(fullHtml);
}

module.exports = {
  generateInterviewReport,
  generateResumePdf,
  generatePdfFromHtml
};