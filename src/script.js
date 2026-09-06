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
