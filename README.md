![Test/Lint status](https://github.com/awildeep/dotted/actions/workflows/unit-test/badge.svg?event=push)

# dotted

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run ./src/dotted.ts
```

This project was created using `bun init` in bun v1.1.32. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## dotted.pick

Get an element from an object

```Typescript
import dotted from "dotted"

const object = {
    'articles': [
        {
            'title': 'An article'
        },
        {
            'title': 'An other article'
        }
    ]
}

dotted.pick(
    object,
    ['articles']
)
//[{'title': 'An article'}.{'title': 'An other article'}]

dotted.pick(
    object,
    ['articles','[0]','title']
)
//'An article'

dotted.pick(
    object,
    ['articles','[1]','title']
)
//'An other article'


//TODO
dotted.pick(
    object,
    ['articles','[]','title']
)
//['An article', 'An other article']

```


## dotted.place

Add an element to an object

### Append an element to an array

Add/append an element to an array

```Typescript
import dotted from "dotted"

const object = {
    'articles': [
        {
            'title': 'An article'
        },
        {
            'title': 'An other article'
        }
    ]
}

//Append an element to an array
dotted.place(
    {'title': 'new publication'},
    object,
    ['articles', '[]']
)

// {
//   'articles': [
//     {
//         'title': 'An article'
//     },
//     {
//         'title': 'An other article'
//     },
//     {
//         'title': 'new publication'
//     }
//   ]
// }

```


### Insert an element to an array

using a specific index, insert an element into an array

```Typescript
import dotted from "dotted"

const object = {
    'articles': [
        {
            'title': 'An article'
        },
        {
            'title': 'An other article'
        }
    ]
}

//Append an element to an array
dotted.place(
    {'title': 'new publication'},
    object,
    ['articles', '[1]']
)

// {
//   'articles': [
//     {
//         'title': 'An article'
//     },
//     {
//         'title': 'new publication'
//     }
//   ]
// }

```


### Insert an element to an object


```Typescript
import dotted from "dotted"

const object = {
    'articles': [
        {
            'title': 'An article'
        },
        {
            'title': 'An other article'
        }
    ]
}

//Append an element to an array
dotted.place(
    {author: 'Samwise Gamgee'},
    object,
    ['articles', '[0]']
)

// {
//   'articles': [
//     {
//         'title': 'An article'
//         'author': 'Samwise Gamgee'
//     },
//     {
//         'title': 'new publication'
//     }
//   ]
// }

```


