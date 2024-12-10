![Test/Lint status](https://github.com/awildeep/dotted/actions/workflows/unit-test.yml/badge.svg?branch=main)

# dotted

Manipulate and extract data in objects, and arrays.

Built with [Bun](https://bun.sh)


## install

Coming soon

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
    '.articles'
)
//[{'title': 'An article'}.{'title': 'An other article'}]

dotted.pick(
    object,
    'articles.[0].title'
)
//'An article'

dotted.pick(
    object,
    '.articles.[1].title'
)
//'An other article'


//TODO
dotted.pick(
    object,
    '.articles.[].title'
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
    '.articles.[]'
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
    '.articles.[1]'
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
    '.articles.[0]'
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


## FAQ

### Why doesn't it do _____ ?

Just never thought of it, or never needed the feature.  Feel free to open a PR.


### How do I query if my path contains a period (.)?

Just pass an array into `pick` or `place` like this:

```Typescript
const object = {
    'articles.are.cool': [
        {
            'title.value': 'An article'
        },
        {
            'title.value': 'An other article'
        }
    ]
}

//Append an element to an array
dotted.place(
    {author: 'Samwise Gamgee'},
    object,
    ['articles.are.cool', '[0]']
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

### How do I query if my path object property is in the array query format

This is a little bit of a annoyance, but you can still query it using a Criterion[] array.

This may change in a future version of the code.

```Typescript
const object = {
    '[1]': {
        '[2]': [
            'value'
        ]
    }
}

//Append an element to an array
dotted.place(
    'another',
    object,
    [
        {search: '[1]', CriterionType.objectMatch},
        {search: '[2]', CriterionType.objectMatch},
        {search: '[]', CriterionType.arrayAppend}
    ]
)

// {
//     '[1]': {
//         '[2]': [
//             'value',
//             'another'
//         ]
//     }
// }

```