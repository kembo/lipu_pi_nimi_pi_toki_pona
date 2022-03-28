function createDiv(cls, contents) {
    const div = document.createElement('div');
    if (cls) {
        console.log(cls);
        if (Array.isArray(cls)) {
            cls.forEach((e) => div.classList.add(e));
        } else {
            div.classList.add(cls);
        }
    }
    if (contents) {
        if (typeof contents == 'string' || contents instanceof String) {
            contents = document.createTextNode(contents);
        }
        if (Array.isArray(contents)) {
            contents.forEach((e) => div.appendChild(e));
        } else {
            div.appendChild(contents);
        }
    }
    return div;
}

window.addEventListener('load', (_ev) => {
    const table = document.getElementById('table');
    const cell = 'cell';
    const pona = 'linja-pona'
    const nijon = 'toki-Nijon';
    const nijonMini = [nijon, 'mini'];
    const alphabet = 'alphabet';

    function createCell(spell, japanese, miniFlag, puFlag) {
        miniFlag = miniFlag != '0';
        return table.appendChild(
            createDiv([cell, puFlag == '1' ? 'pu' : 'non-pu'], [
                createDiv(pona, spell == 'ku' ? '' : spell),
                createDiv(miniFlag ? nijonMini : nijon, japanese),
                createDiv(alphabet, spell)
            ])
        );
    }

    fetch('./kulupu_nimi.csv')
        .then((res) => res.text())
        .then((data) => (
            data.split('\n').slice(1)
                .forEach((line) => line ? createCell(...(line.split(','))) : null)
        ));
});
