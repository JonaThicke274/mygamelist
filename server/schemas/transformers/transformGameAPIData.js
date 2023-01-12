
const transformGameAPIData = (apiResults) => {
    return apiResults.map((apiResult) => {
        const game = apiResult.game;
        if (!game) {
            return null;
        }
        
        return {
            name: game.name,
            link: game.url,
            image: game.cover?.url,
            gameId: game.id,
            description: game.summary,
        }
    }).filter(x => x);
}

module.exports = transformGameAPIData;