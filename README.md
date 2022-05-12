# DungeonsAndDruids
A small project built to house DnD 5e resources for the Druid class. Currently, the project asks for a little bit of information about your character to help you determine if you have the prerequisites to wild shape into a selected beast. 

You can take a look at the live version of Dungeons and Druids here: https://dungeonsanddruids.netlify.app/

![image of webpage, with nature background and green card with information](https://raw.githubusercontent.com/katieleebrown/DungeonsAndDruids/main/dungeonsanddruids.JPG)

# How It's Made:
Tech used: HTML, CSS and Javascript

The HTML and CSS are fairly minimal for this project, which was designed partially as a test of my javascript skills and partially to provide a solution to a recent problem in one of my D&D games.. My goal was to combine APIs and OOP to help players quickly determine if they could shift into a given creature. The druid class has some limitations on what animals you can wild shape into, mostly depending on your character's level and subclass. This takes in that information and responds based on your input. It also includes dropdown updates on page load and structured HTML classes and CSS to ease adding new features in the future.

# Optimizations
One of my favorite optimizations of this project is the dropdown list of creature options. I simplified this function to run on page load, using a map to create a new option in the select for each item in the API object. It populated both the value and name from given API results and then later used those values in future API calls.

In the future, I'd like to include a cache feature that hold the dropdown information instead of refreshing on each page load. I also hope to add an additional feature - a table that incldues a list of all the beasts your character can wild shape into, once given your subclass and level. Ideally, this table will have options to sort by name, AC, or Hit Points. 

# Lessons Learned
When I completed my initial javascript code, it was structured in such a way that class objects were sometimes created before the API data had been received to make them, giving me an empty object. I solved this in two ways - one, making my API calls more specific to shorten the time between the call and response. I also added an async/await feature to make sure the function did not move forward before the information was received. 
