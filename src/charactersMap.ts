 const charactersMap = [
    ["!"," "],
    ["\"",""],
    ["#"," "],
    ["$"," "],
    ["%"," "],
    ["&"," "],
    ["@"," "],
    ["'",""],
    ["("," "],
    [")"," "],
    ["+"," "],
    ["*"," "],
    [","," "],
    ["-"," "],
    ["/"," "],
    [":"," "],
    [";"," "],
    ["<"," "],
    ["="," "],
    [">"," "],
    ["?"," "],
    ["A̋","A"],
    ["A̧","A"],
    ["B̌","B"],
    ["B̧","B"],
    ["C̆","C"],
    ["E̋","E"],
    ["F̌","F"],
    ["I̋","I"],
    ["I̧","I"],
    ["J̌","J"],
    ["K̆","K"],
    ["M̆","M"],
    ["M̌","M"],
    ["M̧","M"],
    ["N̆","N"],
    ["O̧","O"],
    ["P̆","P"],
    ["P̌","P"],
    ["Q̌","Q"],
    ["Q̧","Q"],
    ["R̆","R"],
    ["T̆","T"],
    ["U̧","U"],
    ["V̆","V"],
    ["V̌","V"],
    ["W̌","W"],
    ["X́","X"],
    ["X̆","X"],
    ["X̌","X"],
    ["X̧","X"],
    ["Y̆","Y"],
    ["Y̌","Y"],
    ["Z̧","Z"],
    ["^"," "],
    ["_"," "],
    ["`"," "],
    ["a̋","a"],
    ["a̧","a"],
    ["b̌","b"],
    ["b̧","b"],
    ["c̆","c"],
    ["e̋","e"],
    ["f̌","f"],
    ["i̋","i"],
    ["i̧","i"],
    ["k̆","k"],
    ["m̆","m"],
    ["m̌","m"],
    ["m̧","m"],
    ["n̆","n"],
    ["o̧","o"],
    ["p̆","p"],
    ["p̌","p"],
    ["q̌","q"],
    ["q̧","q"],
    ["r̆","r"],
    ["t̆","t"],
    ["u̧","u"],
    ["v̆","v"],
    ["v̌","v"],
    ["w̌","w"],
    ["x́","x"],
    ["x̆","x"],
    ["x̌","x"],
    ["x̧","x"],
    ["y̆","y"],
    ["y̌","y"],
    ["z̧","z"],
    ["{"," "],
    ["}"," "],
    ["~"," "],
    ["À","A"],
    ["Á","A"],
    ["Â","A"],
    ["Ã","A"],
    ["Ä","A"],
    ["Å","A"],
    ["Æ","AE"],
    ["Ç","C"],
    ["È","E"],
    ["É","E"],
    ["Ê","E"],
    ["Ê̌","E"],
    ["Ë","E"],
    ["Ì","I"],
    ["Í","I"],
    ["Î","I"],
    ["Ï","I"],
    ["Ð","D"],
    ["Ñ","N"],
    ["Ò","O"],
    ["Ó","O"],
    ["Ô","O"],
    ["Õ","O"],
    ["Ö","O"],
    ["Ø","O"],
    ["Ù","U"],
    ["Ú","U"],
    ["Û","U"],
    ["Ü","U"],
    ["Ý","Y"],
    ["Þ","TH"],
    ["à","a"],
    ["á","a"],
    ["â","a"],
    ["ã","a"],
    ["ä","a"],
    ["å","a"],
    ["æ","ae"],
    ["ç","c"],
    ["è","e"],
    ["é","e"],
    ["ê","e"],
    ["ê̌","e"],
    ["ë","e"],
    ["ì","i"],
    ["í","i"],
    ["î","i"],
    ["ï","i"],
    ["ð","d"],
    ["ñ","n"],
    ["ò","o"],
    ["ó","o"],
    ["ô","o"],
    ["õ","o"],
    ["ö","o"],
    ["ø","o"],
    ["ù","u"],
    ["ú","u"],
    ["û","u"],
    ["ü","u"],
    ["ý","y"],
    ["þ","th"],
    ["ÿ","y"],
    ["Ā","A"],
    ["ā","a"],
    ["Ă","A"],
    ["ă","a"],
    ["Ą","A"],
    ["ą","a"],
    ["Ć","C"],
    ["ć","c"],
    ["Ĉ","C"],
    ["ĉ","c"],
    ["Ċ","C"],
    ["ċ","c"],
    ["Č","C"],
    ["Č̣","C"],
    ["č","c"],
    ["č̣","c"],
    ["Ď","D"],
    ["ď","d"],
    ["Đ","D"],
    ["đ","d"],
    ["Ē","E"],
    ["ē","e"],
    ["Ĕ","E"],
    ["ĕ","e"],
    ["Ė","E"],
    ["ė","e"],
    ["Ę","E"],
    ["ę","e"],
    ["Ě","E"],
    ["ě","e"],
    ["Ĝ","G"],
    ["ĝ","g"],
    ["Ğ","G"],
    ["ğ","g"],
    ["Ġ","G"],
    ["ġ","g"],
    ["Ģ","G"],
    ["ģ","g"],
    ["Ĥ","H"],
    ["ĥ","h"],
    ["Ħ","H"],
    ["ħ","h"],
    ["Ĩ","I"],
    ["ĩ","i"],
    ["Ī","I"],
    ["ī","i"],
    ["Ĭ","I"],
    ["ĭ","i"],
    ["Į","I"],
    ["į","i"],
    ["İ","I"],
    ["ı","i"],
    ["Ĳ","IJ"],
    ["ĳ","ij"],
    ["Ĵ","J"],
    ["ĵ","j"],
    ["Ķ","K"],
    ["ķ","k"],
    ["Ĺ","L"],
    ["ĺ","l"],
    ["Ļ","L"],
    ["ļ","l"],
    ["Ľ","L"],
    ["ľ","l"],
    ["Ŀ","L"],
    ["ŀ","l"],
    ["Ł","l"],
    ["ł","l"],
    ["Ń","N"],
    ["ń","n"],
    ["Ņ","N"],
    ["ņ","n"],
    ["Ň","N"],
    ["ň","n"],
    ["ŉ","n"],
    ["Ō","O"],
    ["ō","o"],
    ["Ŏ","O"],
    ["ŏ","o"],
    ["Ő","O"],
    ["ő","o"],
    ["Œ","OE"],
    ["œ","oe"],
    ["Ŕ","R"],
    ["ŕ","r"],
    ["Ŗ","R"],
    ["ŗ","r"],
    ["Ř","R"],
    ["Ř̩","R"],
    ["ř","r"],
    ["ř̩","r"],
    ["Ś","S"],
    ["ś","s"],
    ["Ŝ","S"],
    ["ŝ","s"],
    ["Ş","S"],
    ["ş","s"],
    ["Š","S"],
    ["š","s"],
    ["Ţ","T"],
    ["ţ","t"],
    ["Ť","T"],
    ["ť","t"],
    ["Ŧ","T"],
    ["ŧ","t"],
    ["Ũ","U"],
    ["ũ","u"],
    ["Ū","U"],
    ["ū","u"],
    ["Ŭ","U"],
    ["ŭ","u"],
    ["Ů","U"],
    ["ů","u"],
    ["Ű","U"],
    ["ű","u"],
    ["Ų","U"],
    ["ų","u"],
    ["Ŵ","W"],
    ["ŵ","w"],
    ["Ŷ","Y"],
    ["ŷ","y"],
    ["Ÿ","Y"],
    ["Ź","Z"],
    ["ź","z"],
    ["Ż","Z"],
    ["ż","z"],
    ["Ž","Z"],
    ["ž","z"],
    ["ſ","s"],
    ["Ɛ̧","E"],
    ["ƒ","f"],
    ["Ɨ̧","I"],
    ["Ơ","O"],
    ["ơ","o"],
    ["Ư","U"],
    ["ư","u"],
    ["Ǎ","A"],
    ["ǎ","a"],
    ["Ǐ","I"],
    ["ǐ","i"],
    ["Ǒ","O"],
    ["ǒ","o"],
    ["Ǔ","U"],
    ["ǔ","u"],
    ["Ǖ","U"],
    ["ǖ","u"],
    ["Ǘ","U"],
    ["ǘ","u"],
    ["Ǚ","U"],
    ["ǚ","u"],
    ["Ǜ","U"],
    ["ǜ","u"],
    ["Ǧ","G"],
    ["ǧ","g"],
    ["Ǩ","K"],
    ["ǩ","k"],
    ["ǰ","j"],
    ["Ǵ","G"],
    ["ǵ","g"],
    ["Ǹ","N"],
    ["ǹ","n"],
    ["Ǻ","A"],
    ["ǻ","a"],
    ["Ǽ","AE"],
    ["ǽ","ae"],
    ["Ǿ","O"],
    ["ǿ","o"],
    ["Ȁ","A"],
    ["ȁ","a"],
    ["Ȃ","A"],
    ["ȃ","a"],
    ["Ȅ","E"],
    ["ȅ","e"],
    ["Ȇ","E"],
    ["ȇ","e"],
    ["Ȉ","I"],
    ["ȉ","i"],
    ["Ȋ","I"],
    ["ȋ","i"],
    ["Ȍ","O"],
    ["ȍ","o"],
    ["Ȏ","O"],
    ["ȏ","o"],
    ["Ȑ","R"],
    ["ȑ","r"],
    ["Ȓ","R"],
    ["ȓ","r"],
    ["Ȕ","U"],
    ["ȕ","u"],
    ["Ȗ","U"],
    ["ȗ","u"],
    ["Ș","S"],
    ["ș","s"],
    ["Ț","T"],
    ["ț","t"],
    ["Ȟ","H"],
    ["ȟ","h"],
    ["Ȩ","E"],
    ["ȩ","e"],
    ["ɛ̧","e"],
    ["ɨ̧","i"],
    ["Ѓ","Г"],
    ["Ќ","К"],
    ["ѓ","г"],
    ["ќ","к"],
    ["Ḉ","C"],
    ["ḉ","c"],
    ["Ḑ","D"],
    ["ḑ","d"],
    ["Ḕ","E"],
    ["ḕ","e"],
    ["Ḗ","E"],
    ["ḗ","e"],
    ["Ḝ","E"],
    ["ḝ","e"],
    ["Ḩ","H"],
    ["ḩ","h"],
    ["Ḫ","H"],
    ["ḫ","h"],
    ["Ḯ","I"],
    ["ḯ","i"],
    ["Ḱ","K"],
    ["ḱ","k"],
    ["Ḿ","M"],
    ["ḿ","m"],
    ["Ṍ","O"],
    ["ṍ","o"],
    ["Ṑ","O"],
    ["ṑ","o"],
    ["Ṓ","O"],
    ["ṓ","o"],
    ["Ṕ","P"],
    ["ṕ","p"],
    ["Ṥ","S"],
    ["ṥ","s"],
    ["Ṧ","S"],
    ["ṧ","s"],
    ["Ṹ","U"],
    ["ṹ","u"],
    ["Ẁ","W"],
    ["ẁ","w"],
    ["Ẃ","W"],
    ["ẃ","w"],
    ["Ấ","A"],
    ["ấ","a"],
    ["Ầ","A"],
    ["ầ","a"],
    ["Ắ","A"],
    ["ắ","a"],
    ["Ằ","A"],
    ["ằ","a"],
    ["Ẳ","A"],
    ["ẳ","a"],
    ["Ẵ","A"],
    ["ẵ","a"],
    ["Ặ","A"],
    ["ặ","a"],
    ["Ế","E"],
    ["ế","e"],
    ["Ề","E"],
    ["ề","e"],
    ["Ố","O"],
    ["ố","o"],
    ["Ồ","O"],
    ["ồ","o"],
    ["Ứ","U"],
    ["ứ","u"],
    ["Ừ","U"],
    ["ừ","u"],
    ["Ỳ","Y"],
    ["ỳ","y"]
]

export default charactersMap;