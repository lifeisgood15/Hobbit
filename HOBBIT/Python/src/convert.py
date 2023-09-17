import nltk
import re
nltk.download('punkt')

sample_pronouns = {"am" : "are", "are" : "am", 'i' : 'you', 'my' : 'your', 'me' : 'you', 'mine' : 'yours', 'you' : 'I', 'your' : 'my', 'your' : 'mine', 'we' : 'you', 'us' : 'yours', 'our' : 'your', 'ourselves' : 'yourselves', 'myself': 'yourself' }
def change_person(word):
    if word.lower() in sample_pronouns: return sample_pronouns[word.lower()]
    return word

def get_format(sentence):
    print(nltk.word_tokenize(sentence))
    result = ([change_person(word) for word in nltk.word_tokenize(sentence)])
    final = ''
    for w in result:
        if re.match("['-]", w):
            final += w
        elif re.match("[,;.]", w):
            final += w + ' '
        else:
            final += ' ' + w
    return(final.strip())
