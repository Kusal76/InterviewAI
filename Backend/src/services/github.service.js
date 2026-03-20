/**
 * Fetches a user's recent GitHub repositories and calculates their most used languages.
 */
async function getTopGithubLanguages(accessToken) {
    // If the user didn't log in with GitHub, we just gracefully skip this
    if (!accessToken) return null;

    try {
        // 1. Fetch the user's 5 most recently updated repositories
        const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=5', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'InterviewAI-App' // GitHub requires a User-Agent header
            }
        });

        if (!response.ok) {
            console.log("GitHub API Warning: Could not fetch repos.");
            return null;
        }

        const repos = await response.json();

        // 2. Extract the main programming language from each repo
        const languages = repos
            .map(repo => repo.language)
            .filter(lang => lang != null); // Remove any null values (like text-only repos)

        // 3. Count which languages appear the most
        const languageCounts = {};
        languages.forEach(lang => {
            languageCounts[lang] = (languageCounts[lang] || 0) + 1;
        });

        // 4. Turn it into a clean, comma-separated string for Gemini (e.g., "JavaScript, HTML, Python")
        const topLanguages = Object.keys(languageCounts).join(', ');

        return topLanguages || "No specific languages found";

    } catch (error) {
        console.error("GitHub Service Error:", error.message);
        return null; // Fail silently so the interview generation doesn't crash
    }
}

module.exports = { getTopGithubLanguages };