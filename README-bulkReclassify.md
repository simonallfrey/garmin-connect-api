https://forums.garmin.com/apps-software/mobile-apps-web/f/garmin-connect-web/252746/bulk-update-activity-privacy-settings

Bulk update activity privacy settings

I updated my default privacy for new activities to something more secure but couldn't find a way to bulk update past activities. Disappointingly, this isn't a product feature but I have fed back to Garmin that this really should be. I managed to find a workaround to apply myself and wanted to share clear instructions here. I've stitched this together from a few other posts on these forums that provided the base solution - I just felt the instructions could be a bit clearer, a dummy's guide if you will. 

Please ask any questions if you have them and I'll do my best. Hope this actually helps someone!

Notes:
SJA: This worked for me 29 Oct 2022

This worked at the time of writing on 26 Jan 2021
I had 542 activities to update and it was fine - there might be a limit at which this doesn't work though
I ran this on my Mac from Chrome but believe it should work fine on Mozilla Firefox and on a Windows machine (don't ask me about IE...)
This will update all your activities to the same privacy setting
The activities are worked through in the order they're displayed in the Garmin activities page
If you want to sort the order they are worked through in or filter the ones you update, this can be done by modifying line 2 of the script. I had no need to and haven't documented here how to do it - ask if you have this requirement and I can show you how
If your activities already have the privacy setting you're applying, they'll be fine
Preparation

I have prepared a script, which you can access here, [bulkReclassify.md](bulkReclassify.md)
but this requires a few updates. Copy the text into notepad or similar then make the edits below. 

Set an activity limit
You can control how many activities will be updated when you run this script. I used this to test the script and gain confidence it was working by setting the number to 2, then gradually increasing it towards 10 before I was comfortable I had a good script and ran it with a value of 1000. If you want to test this, please use this limit as you please. If you want to YOLO it, just set it to like 10000 and see what happens. 

To set the activity limit, replace the text [UPDATE LIMIT] with an integer, like 2, 10, or 1000. You need to remove the square brackets too. After updating, line 2 will look as follows, using 1000 as an example:

    '/modern/proxy/activitylist-service/activities/search/activities?limit=1000',
Set your privacy level
There are 4 privacy settings you can set your activities to. You will need to replace a bit of code depending on which you want to use. To do this, replace the text [UPDATE PRIVACY SETTING HERE] with one of the following

private for Only Me
subscribers for My Connections
groups for My Connections and Groups
public for Everyone
After updating, that line will look as follows, using subscribers as an example:

     'body': '{"accessControlRuleDTO":{"typeKey":"subscribers"},"activityId":' + act['activityId'] + '}',
Steps to update

Go to the Garmin activities page (make sure you're logged in!)

https://connect.garmin.com/modern/activities

Open developer tools - you can do this as in the screenshot below or by pressing F12. Note that the tool may open in a different position on your screen. 

 

Go to Sources
Click on Snippets if you're not already on it
Click New Snippet - give the snippet a name if you wish
Copy and paste your updated code, with limit and privacy setting, into the box to the side
Click the play button to run the script 

SJA: I ran with limit 10000 and this fixed all 208 of my existing activities

 
How will I know if it has worked?
During my testing, I gained confidence the activity settings were updating by:

opening a few activities
changing the privacy settings to something other than the value I set in the script
running the script
refreshing those activity pages
checking the privacy settings had updated to what was specified in the script
To know if all my activities were updated, I looked at something on the console. I set a limit of 1000 and saw that 542 activities had been updated. This meant I had run through all my activities. If the number you see here is the same as your limit, try increasing your limit until it is higher than the number of updates made. 

 

How does this work?
Essentially, we are:

calling an API on the Garmin page to return the activities 
using another API to update the privacy setting for the first activity returned
repeating this process for all activities in the list

