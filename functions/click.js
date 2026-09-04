export async function onRequestPost(context) {
    const { game } = await context.request.json();

    if (!game) {
        return new Response("game is required", { status: 400 });
    }

    // ① テーブルがなければ作る（初回だけ実行されるイメージ）
    await context.env.myDatabase
        .prepare(
            `
            CREATE TABLE IF NOT EXISTS clicks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game TEXT NOT NULL,
                ts DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `,
        )
        .run();

    // ② クリックログを追加
    await context.env.myDatabase.prepare("INSERT INTO clicks (game) VALUES (?)").bind(game).run();

    // ③ 過去3か月より古いデータを削除
    await context.env.myDatabase.prepare("DELETE FROM clicks WHERE ts < datetime('now', '-3 months')").run();

    return new Response("ok");
}
