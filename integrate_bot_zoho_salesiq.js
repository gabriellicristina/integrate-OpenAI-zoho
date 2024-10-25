## PLug's (1,2)

# ChatGPTAssistantsCreateRuns
//ChatGPT api key
api_key = "sk-proj-T*****sA";
chatGPT_assistant_id = "asst_D*********pl";
//Header parameters
headers = Map();
headers.put("Authorization","Bearer " + api_key);
headers.put("Content-Type","application/json");
headers.put("OpenAI-Beta","assistants=v2");
//Get the thread ID from the plug input parameters
thread_id = session.get("threadID").get("value");
user_input = session.get("userInput").get("value");
info thread_id;
info user_input;
// Messages API call
requestBody = Map();
requestBody.put("role","user");
requestBody.put("content",user_input);
jsonRequestBody = requestBody.toString();
// The following webhook posts a message to the conversation thread
response = invokeurl
[
	url :"https://api.openai.com/v1/threads/" + thread_id + "/messages"
	type :POST
	parameters:jsonRequestBody
	headers:headers
];
info response;
// Runs API call
requestBody = Map();
requestBody.put("assistant_id",chatGPT_assistant_id);
jsonRequestBody = requestBody.toString();
// The following runs the thread which inturn generates a response once the thread is completed
response = invokeurl
[
	url :"https://api.openai.com/v1/threads/" + thread_id + "/runs"
	type :POST
	parameters:jsonRequestBody
	headers:headers
];
response_json = response.toMap();
run_id = response_json.get("id");
run_status = "queued";
retry_count = {1,2,3,4,5};
for each  retry in retry_count
{
	if(run_status != "completed")
	{
		// The above executed run takes few seconds to complete. Hence a considerable time has to be left before the run is completed and the messages are fetched from the thread can be fetched. Here we wait for 3 seconds assuming the run gets complete within 3 seconds
		getUrl("https://httpstat.us/200?sleep=3000");
		response = invokeurl
		[
			url :"https://api.openai.com/v1/threads/" + thread_id + "/runs/" + run_id
			type :GET
			headers:headers
		];
		response_json = response.toMap();
		run_status = response_json.get("status");
	}
}
// The following webhook fetches the messages from the thread
getmsg_url = "https://api.openai.com/v1/threads/" + thread_id + "/messages";
response = invokeurl
[
	url :getmsg_url
	type :GET
	headers:headers
];
info response;
response_json = response.toMap();
// Getting the last message from the thread messages list which is the assistant response for the user input.
assistant_response = response_json.get("data").get("0").get("content").get("0").get("text").get("value");
info assistant_response;
response = Map();
response.put("assistantReply",assistant_response);
return response;


## ChatGPTAssistantsCreateThread
api_key = "sk-p*****sA";
//Header parameters
headers = Map();
headers.put("Authorization","Bearer " + api_key);
headers.put("Content-Type","application/json");
headers.put("OpenAI-Beta","assistants=v2");
//This param is needed to use the V2 assistant apis
// The following webhook will create a thread and return the thread id
response = invokeurl
[
	url :"https://api.openai.com/v1/threads"
	type :POST
	headers:headers
];
response_json = response.toMap();
thread_id = response_json.get("id");
response.put("threadID",thread_id);
return response;
