
response = Map();
messageLimit = 10;
getChatHistory = invokeurl
[
	url :"https://cliq.zoho.com/api/v2/chats/" + chat.get("id") + "/messages?limit=" + messageLimit
	type :GET
	connection:"cliquser"
];
chatMessages = list();
for each  chatMessage in getChatHistory.get("data")
{
	if(chatMessage.get("sender").get("id").startsWith("b"))
	{
		role = "assistant";
	}
	else
	{
		role = "user";
	}
	content = ifnull(chatMessage.get("content").get("text"),"");
	content = content.replaceAll("\n"," ");
	content = content.replaceAll("\t"," ");
	chatMessages.add({"role":role,"content":content});
}
thread = Map();
thread.put("messages",chatMessages);
openAIkey = "sk-proj-Tn*******sA";
openAIassistantKey = "asst_D*******Zl";
openAIheaders = Map();
openAIheaders.put("Authorization","Bearer " + openAIkey);
openAIheaders.put("Content-Type","application/json");
openAIheaders.put("OpenAI-Beta","assistants=v2");
runParams = Map();
runParams.put("thread",{"messages":chatMessages});
runParams.put("assistant_id",openAIassistantKey);
createRun = invokeurl
[
	url :"https://api.openai.com/v1/threads/runs"
	type :POST
	parameters:runParams.toString()
	headers:openAIheaders
];
threadId = createRun.get("thread_id");
if(threadId.isNull())
{
	return {"text":createRun};
}
runId = createRun.get("id");
// Testando chegar o status em Zoho Flow
run_status = "queued";
retry_count = {1,2,3,4,5};
for each  retry in retry_count
{
	if(run_status != "completed")
	{
		getUrl("https://httpstat.us/200?sleep=3000");
		response = invokeurl
		[
			url :"https://api.openai.com/v1/threads/" + threadId + "/runs/" + runId
			type :GET
			headers:openAIheaders
		];
		response_json = response.toMap();
		run_status = response_json.get("status");
	}
}
getmsg_url = "https://api.openai.com/v1/threads/" + threadId + "/messages";
response = invokeurl
[
	url :getmsg_url
	type :GET
	headers:openAIheaders
];
response_json = response.toMap();
assistant_response = response_json.get("data").get("0").get("content").get("0").get("text").get("value");
return {"text":assistant_response};
