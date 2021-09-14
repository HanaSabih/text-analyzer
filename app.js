



function analyseText() {
  document.getElementById("analyseResult").style.visibility = "visible";
  document.getElementById("resetButton").style.visibility = "visible";
  document.getElementById("searchForm").style.visibility = "visible";
  document.getElementById("docinfo").style.visibility = "visible";
  document.getElementById("submit").style.visibility = "hidden";
  document.getElementById("searchstat").innerHTML = "";
  document.getElementById("keyword").value = "";
  textChecker ();
};

function resetText() {
  document.getElementById("analyseResult").style.visibility = "hidden";
  document.getElementById("resetButton").style.visibility = "hidden";
  document.getElementById("searchForm").style.visibility = "hidden";
  document.getElementById("docinfo").style.visibility = "hidden";
  document.getElementById("submit").style.visibility = "visible";
  document.getElementById("textContent").value = '';
  document.getElementById("keyword").value = "";
  document.getElementById("searchstat").innerHTML = "";
};


function textChecker (){
  if(document.getElementById("textContent").value == '')
{
    alert("please insert some text");
    resetText();
}else {
  let currentText = document.getElementById("textContent").value;
  
  getDocStats(currentText);

    
}
};

//get the stats for the book
function getDocStats(fileContent) {

    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");

    let text = fileContent.toLowerCase();
    let wordArray = text.split(/\W+/);
    let wordDictionary = {};
    let wordDictionarycom = {};


    //Count every word in the wordArray uncommonwords
    for (let wordcom in wordArray) {
        let wordValuecom = wordArray[wordcom];
        if (wordDictionarycom[wordValuecom] > 0) {
            wordDictionarycom[wordValuecom] += 1;
        } else {
            wordDictionarycom[wordValuecom] = 1;
        }
    }

    //sort the array
    let wordListcom = sortProperties(wordDictionarycom);


    //Return the top 10 words common
    const top10Wordscom = wordListcom.slice(0, 11);

    
    ULTemplate(top10Wordscom, document.getElementById("mostComUsed"));



    var uncommonWords = [];

    //filter out the uncommon words
    uncommonWords = filterStopWords(wordArray);


    //Count every word in the wordArray
    for (let word in uncommonWords) {
        let wordValue = uncommonWords[word];
        if (wordDictionary[wordValue] > 0) {
            wordDictionary[wordValue] += 1;
        } else {
            wordDictionary[wordValue] = 1;
        }
    }

    //sort the array
    let wordList = sortProperties(wordDictionary);

    //Return the top 10 words
    var top10Words = wordList.slice(0, 11);
    //return the least 10 words
    var least10Words = wordList.slice(-11, wordList.length);

    //Write the values to the page
    ULTemplate(top10Words, document.getElementById("mostUsed"));
    ULTemplate(least10Words, document.getElementById("leastUsed"));

    docLength.innerText = "Document Length: " + text.length;
    wordCount.innerText = "Word Count: " + wordArray.length;

}

function ULTemplate(items, element) {
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + " : " + items[i][1] + " time(s)");
    }

    element.innerHTML = resultsHTML;

}

function sortProperties(obj) {
    //first convert the object to an array
    let rtnArray = Object.entries(obj);

    //Sort the array
    rtnArray.sort(function (first, second) {
        return second[1] - first[1];
    });

    return rtnArray;

}

//filter out stop words
function filterStopWords(wordArray) {
    var commonWords = getStopWords();
    var commonObj = {};
    var uncommonArr = [];

    for (i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
    }

    for (i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }

    return uncommonArr;
}
//a list of stop words we don't want to include in stats
function getStopWords() {
    return ["a", "t", "able", "about", "s" , "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

//highlight the words in search
function performMark() {

    document.getElementById("searchstat").innerHTML = "";
    
    //read the keyword
    
    var keyword = document.getElementById("keyword").value;
    var disp = document.getElementById("textContent").value;
    var textinp = disp.toLowerCase();
    var textDisp = textinp.split(/\W+/);
    var count = 0;
    var len = textDisp.length;


    for (var i=0;i<len;i++){
        if (textDisp[i] === keyword){
            count++;
        }
}
    
   

    document.getElementById("searchstat").innerHTML = "found " + count + " matches";





}