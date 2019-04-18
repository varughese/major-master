## `prereq-cli`

For this program to work, you must install
[pegjs](https://www.npmjs.com/package/pegjs) globally with the
following command.

```
$ npm install -g pegjs
```

Next you will need to navigate to the `scraper/` directory and generate the
parser with this next command.

```
$ cd scraper
$ pegjs parser.pegjs
```

Run the following command for info on how to use this tool.

```
$ ./prereq-cli --help
```

### Examples

Here are some examples showing how to use this tool.

The following command will parse the prerequisites from `data.json` and write
them back to `out.json` with no indentation.

```
$ ./prereq-cli data.json
```

This next command will parse the prerequisites from `out.json`, allow the
user to tweak the entries that failed to parse, and write them back to
`courses.json` with an indentation of 2 spaces.

```
$ ./prereq-cli out.json -o courses.json -s2 -f
```

When the tool prompts the user to fix some unparsed text, they can either enter
in a modified version of the text to be reparsed, they can enter a blank line,
or they can enter `.exit`.

If the user enters some new text, the parser will attempt to build the syntax
tree again.  If this fails, it will leave the tree `null` and keep the text.  In
the case that the change produces a valid syntax tree, the tree will be set and
the text will be kept.  The modified text is not saved, only the tree
it produced.

If the user enters a blank line, no change will be made; it will leave the tree
`null` and keep the text.

If the user enters `.exit`, the operation will be cancelled and the rest of the
entries will be left as is, where any entries whose text failed to parse will
leave the tree `null` and keep the text.

### Flags

There are a few flags, namely `-f`, `-o`, `-s`, `-u`. Each is explained in
detail below and gives you control over different aspects of this tool.

The `-f` flag is short for `--fix-errors`, which enables the user to manually
edit entries that failed to parse.  This is disabled by default.

The `-o` flag comes before the output file name.  The default output file is
`out.json`.  This flag conflicts with `-u`.

The `-s` flag is short for `--spaces`, which specifies the amount of whitespace
to pad the JSON output with.  The default value is `0`.  When `0` is specified,
the JSON will not be indented.  This makes the JSON file smaller, but editors
will struggle to load the file without any `'\n'` characters.

The `-u` flag is short for `--update`, which specifies that the output file
should be the same as the input file.  This is disabled by default.  This flag
conflicts with `-o`.
