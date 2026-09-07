function count(game) {
    fetch("/click", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ game }),
    }).catch((err) => {
        console.error("Failed to send click:", err);
    });
}

async function getAnalysis() {
    try {
        const res = await fetch("/popular");
        if (!res.ok) throw new Error("Server error");
        return await res.json(); // ← JSON に変換
    } catch (err) {
        console.error("Failed to get analysis:", err);
        return null;
    }
}

async function getGameData(path = "/data/game-data.json") {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("Server error");
        return await res.json();
    } catch (err) {
        console.error("Failed to get resources:", err);
        return null;
    }
}

async function getNews(path = "/data/news.json") {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("Server error");
        return await res.json();
    } catch (err) {
        console.error("Failed to get resources:", err);
        return null;
    }
}

function createArticle({ title, content, date, uuid }) {
    const isNew = localStorage.getItem(uuid) === null;
    const article = document.createElement("article");
    article.classList.add("news-row");
    let formatted = "";
    for (const el of content) formatted += `<p>${el}</p>`;
    article.innerHTML = `
    <div class="meta-tag">
        ${isNew ? `<img src="/assets/new-tag.png" class="new-tag" />` : ""}
        <time>${date}</time>
    </div>
    <h3 class="news-title">${title}</h3>
    <div class="main-text">
        ${formatted}
    </div>
    `;
    return article;
}

async function main() {
    const news = await getNews();
    for (const el of news) {
        const article = createArticle(el);
        document.querySelector(".news-container").appendChild(article);
    }
}

main();
