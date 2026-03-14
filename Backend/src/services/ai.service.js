const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  // 🔥 THE NUCLEAR PROMPT: No room for Gemini to hallucinate
  const prompt = `
You are a strict data-parsing API. 
Analyze the Job Description, Resume, and Self Description below.

Job Description: ${jobDescription}
Resume: ${resume}
Self Description: ${selfDescription}

CRITICAL INSTRUCTION: You MUST return ONLY a raw, valid JSON object. 
Do NOT wrap the output in markdown (no \`\`\`json).
You MUST use EXACTLY the keys shown in the template below. 
The fields "technicalQuestions", "behavioralQuestions", "skillGaps", and "preparationPlan" MUST be arrays of OBJECTS, exactly as shown. Do not return arrays of strings.

{
  "title": "System Engineer",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Real technical question based on their resume?",
      "intention": "Why ask this?",
      "answer": "Ideal model answer"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Real behavioral question?",
      "intention": "Why ask this?",
      "answer": "Ideal model answer"
    }
  ],
  "skillGaps": [
    {
      "skill": "Name of missing skill",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Main focus topic",
      "tasks": ["Task 1", "Task 2"]
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", 
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0,
    }
  })

  // Clean up any stray backticks
  let rawText = response.text;
  rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(rawText)
}

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
  await page.setContent(htmlContent, {
    waitUntil: 'domcontentloaded',
    timeout: 0
  });

  const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        timeout: 0
    });

  await browser.close()
  return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
    You are a professional Resume Designer. Create a one-page resume that matches the structure of the provided template but with LARGER, highly readable text.
    
    Layout Structure:
    1. Header: Name (Top Left, very large bold), Contact info in a 2-column grid.
    2. Sections: PROFILE, SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION.
    3. Section Headers: Bold uppercase text, followed by a thick full-width horizontal line.
    4. Skills: A 2-column grid of categories (Bold Category: List).
    5. Lists (Experience/Education): Date/Location on the left, Content (Title, Company, Bullets) on the right.

    Data: ${resume}
    Goal: Tailor for ${jobDescription}

    INSTRUCTIONS:
    1. Return ONLY a JSON object with a single key "html".
    2. Use a SERIF font (Times New Roman style).
    3. The body text MUST be exactly 12px for maximum readability.
    4. Managing spacing and margins strictly to ensure it fits on ONE page.

    <style>
      @page { size: A4; margin: 12mm 15mm; }
      body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.4; margin: 0; padding: 0; font-size: 12px; }
      .resume-container { width: 100%; }
      
      /* Header */
      .header h1 { font-size: 32px; margin: 0 0 8px 0; font-weight: bold; letter-spacing: -0.5px; }
      .contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4px 20px; font-size: 12px; margin-bottom: 15px; }
      
      /* Section Styling */
      .section { margin-top: 18px; }
      .section-title { font-size: 15px; font-weight: bold; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
      .hr-line { border-top: 2.5px solid #000; margin-bottom: 8px; }
      
      /* Content Styles */
      .profile-text { font-size: 12px; text-align: justify; margin-bottom: 8px; }
      
      /* 2-Column Skills */
      .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 30px; font-size: 12px; }
      .skill-cat { font-weight: bold; }

      /* Date-Left Layout for Experience/Education */
      .item-row { display: grid; grid-template-columns: 140px 1fr; gap: 20px; margin-bottom: 15px; font-size: 12px; }
      .item-date { color: #000; font-weight: 500; }
      .item-content b { font-size: 13.5px; display: block; margin-bottom: 1px; }
      .item-content i { color: #444; display: block; margin-bottom: 5px; font-style: italic; }
      .bullets { padding-left: 18px; margin: 0; list-style-type: disc; }
      .bullets li { margin-bottom: 4px; }
    </style>
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0,
    }
  });

  let rawText = response.text;
  rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsedJson = JSON.parse(rawText);

  // Wrap the content to ensure the layout is applied
  const fullHtml = `<div class="resume-container">${parsedJson.html}</div>`;

  const pdfBuffer = await generatePdfFromHtml(fullHtml);
  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf, generatePdfFromHtml };