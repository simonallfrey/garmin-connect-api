jQuery.getJSON(
    '/modern/proxy/activitylist-service/activities/search/activities?limit=[UPDATE LIMIT]',
    function(act_list)
    {
        console.log(act_list.length)
        act_list.forEach(
        function(act)
            {
                // Update privacy
                fetch('/proxy/activity-service/activity/' + act['activityId'],
                {
                    'headers': { 'Content-Type': 'application/json', 'nk': 'NT', 'X-HTTP-Method-Override': 'PUT' },
                    'body': '{"accessControlRuleDTO":{"typeKey":"[UPDATE PRIVACY SETTING HERE]"},"activityId":' + act['activityId'] + '}',
                    'method': 'POST'
                });
            }
        );
    }
);
