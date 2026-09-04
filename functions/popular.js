export async function onRequest(context) {
    const result = await context.env.myDatabase
        .prepare("SELECT game, COUNT(*) AS count FROM clicks GROUP BY game ORDER BY count DESC")
        .all();

    return Response.json(result.results);
}
