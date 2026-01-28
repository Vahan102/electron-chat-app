export async function updateOffer(req, res, next) {
    try {
        const keys = Object.keys(req.body);
        let offers = [];
        for (let i = 0; i < keys.length; i++) {
            offers.push(`${keys[i]} = ?`);
        }
        ;
        let textOffer = offers.join(" ");
        req.body.updateoffer = textOffer;
        next();
        return;
    }
    catch (err) {
        res.status(500).send("Internal Server Error.");
    }
    ;
}
;
//# sourceMappingURL=middlewarefunctions.js.map