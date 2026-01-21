# Question Format Guide

This guide explains how to format questions in `questions.json` for the Java Programming Interview Quiz.

## Basic Question Structure

```json
{
  "id": 16,
  "question": "Your question text here?",
  "answers": [
    "Answer option 1",
    "Answer option 2",
    "Answer option 3",
    "Answer option 4"
  ],
  "correct": 0,
  "explanation": "A brief explanation of why this answer is correct or what the concept means. This is displayed after the user answers the question.",
  "blogLink": "https://example.com/blog-link"
}
```

## Question with Code Snippet

**NEW FORMAT (Recommended - Easy to Read and Edit):**

```json
{
  "id": 17,
  "question": "What will be the output of the following code?",
  "codeSnippet": [
    "public class Example {",
    "    public static void main(String[] args) {",
    "        System.out.println(\"Hello\");",
    "    }",
    "}"
  ],
  "answers": [
    "Hello",
    "World",
    "Error",
    "Nothing"
  ],
  "correct": 0,
  "explanation": "A brief explanation of why this answer is correct or what the concept means.",
  "blogLink": "https://example.com/blog-link"
}
```

## Question with Explanation

The `explanation` field (optional but recommended) provides a brief explanation that appears after the user answers the question. This gives immediate feedback on why the answer is correct or incorrect.

**Example:**
```json
{
  "id": 18,
  "question": "What is the difference between == and .equals() in Java?",
  "answers": [
    "== compares references, .equals() compares values",
    ".equals() compares references, == compares values",
    "They are exactly the same",
    "== is for primitives, .equals() is for objects only"
  ],
  "correct": 0,
  "explanation": "The == operator compares memory references (object identity) for objects, while .equals() compares the actual content/values. For primitives, == compares values.",
  "blogLink": "https://example.com/blog-link"
}
```

## Code Snippet Formatting

### Array Format (Recommended)

Use an **array of strings** where each line of code is a separate string element. This makes it easy to:
- Read the code in the JSON file
- Paste new code examples
- Edit individual lines
- Maintain proper formatting

**Example:**
```json
"codeSnippet": [
  "public class Test {",
  "    public static void main(String[] args) {",
  "        int x = 5;",
  "        System.out.println(x);",
  "    }",
  "}"
]
```

### How to Add Code:

1. Write your Java code normally
2. Put each line as a separate string in the array
3. Keep proper indentation (spaces are preserved)
4. Empty lines are just empty strings: `""`

### Example - Copy and Paste Your Code:

**Your Java code:**
```
public class Test {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "Hello";
        System.out.println(str1 == str2);
    }
}
```

**JSON format (array of strings):**
```json
"codeSnippet": [
  "public class Test {",
  "    public static void main(String[] args) {",
  "        String str1 = \"Hello\";",
  "        String str2 = \"Hello\";",
  "        System.out.println(str1 == str2);",
  "    }",
  "}"
]
```

### Important Notes:

- Each line of code = one string in the array
- Preserve indentation with spaces (they will be displayed correctly)
- Use `\"` to escape quotes inside strings: `"String str = \"Hello\";"`
- Empty lines are just empty strings: `""`
- No trailing commas after the last item in arrays

## Field Descriptions

- **id**: Unique number for the question (increment for new questions)
- **question**: The question text
- **codeSnippet**: (Optional) Array of strings, each representing one line of Java code
- **answers**: Array of 4 answer options (minimum 3, but 4 is recommended)
- **correct**: Index of the correct answer (0 = first answer, 1 = second, etc.)
- **explanation**: (Optional but recommended) Brief explanation shown after the user answers, explaining why the answer is correct or what the concept means
- **blogLink**: URL to a blog post/article about this topic

## Adding New Questions

1. Copy an existing question structure
2. Update the `id` to the next available number
3. Fill in your question and answers
4. If adding code:
   - Use the array format: `"codeSnippet": ["line1", "line2", ...]`
   - Each line of code = one string in the array
   - Preserve indentation
5. Set `correct` to the index (0-3) of the right answer
6. Add an `explanation` field with a brief explanation of the answer
7. Add a `blogLink` URL

## Notes

- The quiz randomly selects 5 questions from all available questions
- Code snippets are optional - only include `codeSnippet` field if you want to show code
- All answers are displayed as multiple choice options
- The correct answer index must match one of the answer options (0-3 for 4 answers)
- The JavaScript supports both array format (new) and string format (old) for backward compatibility