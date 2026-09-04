export async function onRequestPost(context) {
    const { game } = await context.request.json();

    if (!game) {
        return new Response("game is required", { status: 400 });
    }

    // クリックログを追加
    await context.env.myDatabase.prepare("INSERT INTO clicks (game) VALUES (?)").bind(game).run();

    // 過去3か月より古いデータを削除
    await context.env.myDatabase
        .prepare(
            `
            DELETE FROM clicks
            WHERE ts < datetime('now', '-3 months')
        `,
        )
        .run();

    return new Response("ok");
}
