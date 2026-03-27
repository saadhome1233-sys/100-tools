export const categories = [
  { id: 'text', name: 'Text Tools', icon: 'type', description: 'Manipulate, format, and generate text.' },
  { id: 'dev', name: 'Developer Tools', icon: 'code', description: 'JSON, Base64, and coding utilities.' },
  { id: 'calc', name: 'Calculators', icon: 'calculator', description: 'Quick math and financial calculations.' },
  { id: 'image', name: 'Image Tools', icon: 'image', description: 'Resize, compress, and convert images.' },
  { id: 'security', name: 'Security Tools', icon: 'shield', description: 'Hashing, passwords, and security.' },
  { id: 'file', name: 'File Tools', icon: 'file-text', description: 'Merge, split, and convert PDF files.' },
  { id: 'misc', name: 'Misc Tools', icon: 'globe', description: 'Unit converters, QR codes, and more.' }
];

export const tools = [
  // ... existing tools ...
  { id: 'word-counter', category: 'text', name: 'Word Counter', description: 'Count words, characters, and sentences in real-time.', icon: 'text-cursor-input', keywords: ['word', 'count', 'characters', 'text'] },
  { id: 'case-converter', category: 'text', name: 'Case Converter', description: 'Convert text to UPPERCASE, lowercase, Title Case, etc.', icon: 'case-sensitive', keywords: ['case', 'upper', 'lower', 'title'] },
  { id: 'lorem-ipsum', category: 'text', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for layouts and designs.', icon: 'pilcrow', keywords: ['placeholder', 'lorem', 'ipsum', 'generate'] },
  { id: 'text-reverser', category: 'text', name: 'Text Reverser', description: 'Flip your text or reverse word order easily.', icon: 'refresh-ccw', keywords: ['reverse', 'flip', 'mirror'] },
  { id: 'remove-duplicates', category: 'text', name: 'Remove Duplicate Lines', description: 'Clean your list by removing all duplicate lines.', icon: 'list-x', keywords: ['duplicate', 'clean', 'lines', 'list'] },
  { id: 'json-formatter', category: 'dev', name: 'JSON Formatter', description: 'Prettify, validate, and minify JSON data.', icon: 'braces', keywords: ['json', 'format', 'minify', 'pretty'] },
  { id: 'code-beautifier', category: 'dev', name: 'Code Beautifier', description: 'Prettify HTML, CSS, and JavaScript code.', icon: 'wand-2', keywords: ['format', 'beautify', 'clean'] },
  { id: 'html-minifier', category: 'dev', name: 'HTML/CSS/JS Minifier', description: 'Minify code to reduce file size.', icon: 'file-code', keywords: ['minify', 'compress', 'size'] },
  { id: 'base64-converter', category: 'dev', name: 'Base64 Encode/Decode', description: 'Convert text or files to/from Base64 encoding.', icon: 'binary', keywords: ['base64', 'encode', 'decode'] },
  { id: 'url-encoder', category: 'dev', name: 'URL Encoder/Decoder', description: 'Safely encode and decode URL parameters.', icon: 'link', keywords: ['url', 'percent', 'query'] },
  { id: 'jwt-decoder', category: 'dev', name: 'JWT Decoder', description: 'Inspect and decode JSON Web Tokens without security risk.', icon: 'lock-keyhole', keywords: ['jwt', 'token', 'auth', 'debug'] },
  { id: 'regex-tester', category: 'dev', name: 'Regex Tester', description: 'Test and debug regular expressions in real-time.', icon: 'test-tube-2', keywords: ['regex', 'test', 'match'] },
  { id: 'color-picker', category: 'dev', name: 'Color Picker & Converter', description: 'Pick colors and convert between HEX, RGB, and HSL.', icon: 'palette', keywords: ['color', 'pick', 'hex', 'rgb'] },

  // CALCULATORS
  { id: 'basic-calculator', category: 'calc', name: 'Basic Calculator', description: 'Simple math operations (add, subtract, etc.).', icon: 'calculator', keywords: ['math', 'calc', 'basic'] },
  { id: 'scientific-calculator', category: 'calc', name: 'Scientific Calculator', description: 'Advanced math including trig and logs.', icon: 'sigma', keywords: ['advanced', 'math', 'sin', 'cos'] },
  { id: 'age-calculator', category: 'calc', name: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.', icon: 'calendar', keywords: ['age', 'birth', 'date'] },
  { id: 'bmi-calculator', category: 'calc', name: 'BMI Calculator', description: 'Check your Body Mass Index (BMI) instantly.', icon: 'scale', keywords: ['bmi', 'health', 'weight'] },
  { id: 'percentage-calculator', category: 'calc', name: 'Percentage Calculator', description: 'Calculate percentages, increases, and decreases.', icon: 'percent', keywords: ['percent', 'math', 'ratio'] },
  { id: 'loan-calculator', category: 'calc', name: 'Loan/EMI Calculator', description: 'Calculate monthly loan payments and interest.', icon: 'banknote', keywords: ['loan', 'emi', 'finance'] },
  { id: 'discount-calculator', category: 'calc', name: 'Discount Calculator', description: 'Calculate save amount and final price after discount.', icon: 'tag', keywords: ['discount', 'sale', 'save'] },

  // IMAGE TOOLS (Expanded)
  { id: 'image-resizer', category: 'image', name: 'Image Resizer', description: 'Resize images to custom dimensions.', icon: 'move', keywords: ['resize', 'dimensions', 'width', 'height'] },
  { id: 'image-compressor', category: 'image', name: 'Image Compressor', description: 'Reduce image file size with minimal quality loss.', icon: 'shrink', keywords: ['compress', 'optimize', 'size'] },
  { id: 'image-converter', category: 'image', name: 'Image Converter', description: 'Convert between PNG, JPG, and WEBP formats.', icon: 'file-type', keywords: ['convert', 'png', 'jpg', 'webp'] },
  { id: 'image-to-base64', category: 'image', name: 'Image to Base64', description: 'Convert image to Base64 data string.', icon: 'image-plus', keywords: ['base64', 'data', 'url'] },
  { id: 'crop-image', category: 'image', name: 'Crop Image', description: 'Cut and crop images to specific areas.', icon: 'crop', keywords: ['crop', 'cut', 'edit'] },
  { id: 'screenshot-to-pdf', category: 'image', name: 'Screenshot to PDF', description: 'Convert image screenshots into PDF documents.', icon: 'file-up', keywords: ['pdf', 'screenshot', 'convert'] },

  // FILE TOOLS
  { id: 'pdf-merge', category: 'file', name: 'PDF Merge', description: 'Combine multiple PDF files into one document.', icon: 'files', keywords: ['pdf', 'merge', 'combine'] },
  { id: 'pdf-split', category: 'file', name: 'PDF Split', description: 'Separate pages of a PDF into individual files.', icon: 'scissors', keywords: ['pdf', 'split', 'pages'] },
  { id: 'pdf-to-image', category: 'file', name: 'PDF to Image', description: 'Convert PDF pages into high-quality images.', icon: 'file-image', keywords: ['pdf', 'image', 'png', 'jpg'] },
  { id: 'image-to-pdf', category: 'file', name: 'Image to PDF', description: 'Convert one or more images into a single PDF.', icon: 'file-up', keywords: ['image', 'pdf', 'convert'] },
  { id: 'file-size-reducer', category: 'file', name: 'File Size Reducer', description: 'Compress PDF and images to reduce disk space.', icon: 'file-minus', keywords: ['compress', 'size', 'reduce'] },

  // SECURITY & MISC
  { id: 'password-generator', category: 'security', name: 'Password Generator', description: 'Create strong, secure passwords.', icon: 'key', keywords: ['password', 'secure', 'random'] },
  { id: 'hash-generator', category: 'security', name: 'Hash Generator', description: 'Generate MD5, SHA-1, and SHA-256 hashes.', icon: 'fingerprint', keywords: ['hash', 'md5', 'sha'] },
  { id: 'qr-generator', category: 'misc', name: 'QR Code Generator', description: 'Generate QR codes for text or URLs.', icon: 'qr-code', keywords: ['qr', 'code', 'generate'] },
  { id: 'barcode-generator', category: 'misc', name: 'Barcode Generator', description: 'Generate common barcodes (CODE128, EAN, etc.).', icon: 'barcode', keywords: ['barcode', 'code128', 'label'] },
  { id: 'unit-converter', category: 'misc', name: 'Unit Converter', description: 'Convert units for length, weight, and temp.', icon: 'arrow-left-right', keywords: ['convert', 'units'] },
  { id: 'timezone-converter', category: 'misc', name: 'Time Zone Converter', description: 'Convert time between different global time zones.', icon: 'clock', keywords: ['time', 'timezone', 'world'] }
];

// In a real scenario, this list would contain 100+ items.
// I will populate more dynamically or as I build them.
