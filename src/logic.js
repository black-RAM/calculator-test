function divideTerms(expression) {
  let terms = expression.split(/([-+*/])/).filter(c => c)
  terms = terms.reduce((acc, val, i, arr) => {
    // unify negative sign to its number
    if(/-/.test(val) && (/[-+*/]/.test(arr[i-1]) || i == 0)) {
      terms[i + 1] = val + terms[i + 1]
      terms[i] = ""
    } else {
      acc.push(val)
    }
    return acc
  }, [])
  return terms
}

function buildTree(terms, ranker, creator) {
  if(terms.length == 1) return creator(...terms)

  const ranks = terms.map(ranker)
  const min = ranks.lastIndexOf(Math.min(...ranks))
  const root = creator(terms[min])

  root.left = buildTree(terms.slice(0, min), ranker, creator)
  root.right = buildTree(terms.slice(min + 1), ranker, creator)

  return root
}

function reduceTree(root, reducerTable, terminator, transformer) {
  if(terminator(root.data)) return transformer(root.data)
  const leftValue = reduceTree(root.left, reducerTable, terminator, transformer)
  const rightValue = reduceTree(root.right, reducerTable, terminator, transformer)
  const reducer = reducerTable[root.data]
  const value = reducer(leftValue, rightValue)
  return value
}

function calculate(expression) {
  const terms = divideTerms(expression)

  const getPrecedence = (term) => {
  if(["+", "-"].includes(term)) {
    return 1
  } else if(["*", "/"].includes(term)) {
    return 2
  } else {
    return Infinity
  }
  }

  const treeNode = (data) => ({
    data,
    right: null,
    left: null
  })

  const tree = buildTree(terms, getPrecedence, treeNode)

  const operatorTable = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  }

  const numberTest = (string) => {
    return /-?\d+(\.\d+)?/.test(string)
  }

  const result = reduceTree(tree, operatorTable, numberTest, Number)

  return String(result)
}

export default calculate