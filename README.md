![Test/Lint status](https://github.com/datasent-inc/dotted/actions/workflows/unit-test.yml/badge.svg?branch=main)

# dotted

Manipulate and extract data in objects, and arrays.

Built with [Bun](https://bun.sh)

Usable in the browser/node/etc. 


## install

Bun:

    bun install @datasent-inc/dotted


npm:

    npm install @datasent-inc/dotted


yarn:

    yarn add @datasent-inc/dotted


## Import

```Typescript
import dotted from "@datasent-inc/dotted"
```


## dotted.pick

Get an element from an object

```Typescript
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
    '.articles[0].title'
)
//'An article'

dotted.pick(
    object,
    '.articles[1].title'
)
//'An other article'


//TODO
dotted.pick(
    object,
    '.articles[].title'
)
//['An article', 'An other article']

```


## dotted.place

Add an element to an object

### Append an element to an array

Add/append an element to an array

```Typescript
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
    '.articles[]'
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
    '.articles[1]'
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
    '.articles[0]'
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

## dotted.remove

### Insert an element to an object


```Typescript
const object = {
    'articles': [
        {
            'title': 'An article',
            'remove': 'me'
        },
        {
            'title': 'An other article'
        }
    ]
}



//remove an element from an array
dotted.remove(
    object,
    '.articles[0].remove'
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


### Isn't this just like ____?

* [jq](https://jqlang.github.io/jq/)?  No.  This code takes inspiration from jq, but does not intend to be a replacement, or a competitor.

* [dot-object](https://github.com/rhalff/dot-object)? Again, no.  This arose from a similar need, but the code for dot-object is not as maintained as desired. 

So while inspiration was drawn from other sources, the goals and end product are not the same.  Feel free to use the tool of your choice.
