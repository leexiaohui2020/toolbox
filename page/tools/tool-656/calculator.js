function getTotalPerM(corpus, period, mrate) {
  const x = mrate / 12 / 100
  const y = Math.pow(1 + x, period)
  return corpus * (x * y) / (y - 1)
}

function makeDetailPerM(index, lastM, {
  mrate,
  corpus,
  totalPerM
}) {
  const data = {}
  data.corpus = totalPerM
  if (index === 0) {
    data.lixi = corpus * mrate / 100 / 12
    data.lixiTotal = data.lixi
    data.benjin = data.corpus - data.lixi
    data.benjinTotal = data.benjin
  } else {
    data.lixi = (corpus - lastM.benjinTotal) * mrate / 100 / 12
    data.lixiTotal = lastM.lixiTotal + data.lixi
    data.benjin = data.corpus - data.lixi
    data.benjinTotal = lastM.benjinTotal + data.benjin
  }
  data.leiji = data.corpus * (index + 1)
  return data
}

function makeDetailPerMByBenjin(index, lastM, {
  mrate,
  corpus,
  period,
  totalPerM
}) {
  const data = {}
  data.benjin = corpus / period
  if (index === 0) {
    data.benjinTotal = data.benjin
    data.lixi = corpus * mrate / 100 /12
    data.corpus = data.benjin + data.lixi
    data.lixiTotal = data.lixi
    data.leiji = data.benjin + data.lixi
  } else {
    data.benjinTotal = corpus / period * (index + 1)
    data.lixi = (corpus - lastM.benjinTotal) * mrate / 100 / 12
    data.corpus = data.benjin + data.lixi
    data.lixiTotal = lastM.lixiTotal + data.lixi
    data.leiji = lastM.leiji + data.corpus
  }
  return data
}

function getDetailPerMsByBenxi(opts) {
  const details = []
  for (let i = 0; i < opts.period; i++) {
    details.push(makeDetailPerM(i, details[i - 1], opts))
  }
  return details
}

function getDetailPerMsByBenjin(opts) {
  const details = []
  for (let i = 0; i < opts.period; i++) {
    details.push(makeDetailPerMByBenjin(i, details[i - 1], opts))
  }
  return details
}

export default function calculator(
  corpus,
  mrate,
  period,
  loadType
) {
  const totalPerM = getTotalPerM(corpus, period, mrate)
  const total = totalPerM * period
  const rateTotal = total - corpus
  const args = { mrate, corpus, totalPerM, period }
  const detail = loadType === '等额本息' ?
    getDetailPerMsByBenxi(args) :
    getDetailPerMsByBenjin(args)
  return { total, rateTotal, period, detail, totalPerM }
}
