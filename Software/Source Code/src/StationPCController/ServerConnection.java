package StationPCController;

import org.json.*;

import StationPCController.ServiceLocator.Service;
import StationPCController.ServiceLocator.ServiceLocator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.*;
import java.util.Scanner;

import org.apache.http.*;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.HttpHostConnectException;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class ServerConnection implements Service{
	private CloseableHttpClient httpclient;
	private UserConfigs configs;
	
	
	public ServerConnection() {
		this.httpclient = HttpClients.createDefault();
		configs = ServiceLocator.getInstance().getService("configs");
	}
	
	
	public String notifySwipe(String userId, String gateType) {
		String res = "";
		
		try {
			JSONObject j = new JSONObject();
			StringEntity entity;
					
			if (gateType.equals("ENTRANCE")) {
				j.put("S_StationId", configs.getStationId());
				entity = new StringEntity(j.toString());
				HttpPost req = new HttpPost(configs.getServerURL() +
											"uncom/start/" + userId);
				req.setEntity(entity);
				res = sendRequest(req);
				
			} else {
				j.put("E_StationId", configs.getStationId());
				entity = new StringEntity(j.toString());
				HttpPut req = new HttpPut(configs.getServerURL() +
											"uncom/end/" + userId);
				req.setEntity(entity);
				res = sendRequest(req);
			}
			
			
		} catch (JSONException e) {
			e.printStackTrace();
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return res;
	}
	
	
	public String updateClass(String userId, int classType, String trainId) {
		String res = "";
		
		try {
			JSONObject j = new JSONObject();
			j.put("class", classType);
			j.put("TrainId", trainId);
			
			StringEntity entity = new StringEntity(j.toString());
			
			HttpPut req = new HttpPut(configs.getServerURL() +
									"uncom/class/" + userId);
			req.setEntity(entity);
		
			res = sendRequest(req);
			
		} catch (JSONException e) {
			e.printStackTrace();
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();	
		} 
		
		return res;
	}
	

	private String sendRequest(HttpUriRequest req) {
		int code = -1;
		String res = "";
		   
	    try {  	 
	    	req.setHeader("Content-Type", "application/json");
	    	req.setHeader("Authorization", configs.getAuthToken());
	    	
		    HttpResponse httpresponse = httpclient.execute(req);
			code = httpresponse.getStatusLine().getStatusCode();
				 
			BufferedReader br = new BufferedReader( new InputStreamReader(httpresponse.getEntity().getContent(), "utf-8")) ;
		    StringBuilder response = new StringBuilder();
		    String responseLine = null;
		    
		    while ((responseLine = br.readLine()) != null) {
		        response.append(responseLine.trim());
		    }
		    
		    if (code != 200) {
			    JSONObject j = new JSONObject(response.toString());
			    System.out.println(j.get("msg"));
		    
		    } else {
		    	res = "OK";
		    }
	
		} catch (IOException e) {
			res = "Connection Error";
			e.printStackTrace();
			
		} catch (JSONException e) {
			e.printStackTrace();
			res = "Connection Error";
			
		} 

		return res;
	}
	
}
