default - by default, as soon as the browser sees a script tag it downloads the file and then executes the script file. The script files are executed in the order of their occurrence.
defer - loads script async and continues parsing the DOM and executes script after DOM is mounted. Executed before the DOMContentLoaded event
async - loads script async and executes without waiting the DOM is mounted