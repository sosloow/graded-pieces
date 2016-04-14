const trs = Array.prototype.slice.call(document.querySelectorAll('tr'));

const result = trs
  .reduce(groupTrs, [])
  .map(group => group.map(parseTr))
  .map(mergeRows);

console.log(JSON.stringify(result));

function groupTrs(groups, tr) {
  var id = tr.children[0].textContent;

  if (+id) {
    return groups.concat([[tr]]);
  } else if (!id && groups.length > 0) {
    groups[groups.length - 1].push(tr)
    return groups;
  } else {
    return groups;
  }
}

function parseTr(tr) {
  return {
    id: +tr.children[0].textContent,
    grade: +tr.children[1].textContent,
    composer: tr.children[2].textContent,
    name: tr.children[3].textContent,
    benefits: tr.children[4].textContent,
    info: tr.children[5] && tr.children[5].textContent
  }
}

function mergeRows(group) {
  let mainRow = group[0];

  return group.reduce((piece, row) => {
    let info = row.info != ''
      ? `${piece.info} ${row.info}`
      : piece.info

    let benefits = row.benefits != ''
      ? `${(piece.benefits)}\n${row.benefits}`
      : piece.benefits

    return Object.assign({}, piece, {benefits, info});
  });
}
