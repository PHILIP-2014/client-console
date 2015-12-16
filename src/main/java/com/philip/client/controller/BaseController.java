package com.philip.client.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.philip.client.model.Admin;
import com.philip.client.utils.SessionUser;

public class BaseController {
	
	@Autowired
	public MessageSource messageSource;
	
	public final static String SESSION_KEY = "sessionuserkey";

	public Map<String, Object> ajaxResult(Boolean success, Object arg){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("result", success);
		map.put("data", arg);
		return map;
	}
	
	public SessionUser initSessionUser(Admin admin) {

		if(admin==null){
			return null;
		}
		SessionUser sessionUser = new SessionUser();
		sessionUser.setAppKey(admin.getAppkey());
		sessionUser.setLoginName(admin.getName());
		sessionUser.setUid(admin.getId());
		sessionUser.setGmtLogin(new Date());

		return sessionUser;
	}
	
	/**
	 * 获取当前登录用户uid
	 * @param request
	 * @return
	 */
	public Long getUid(HttpServletRequest request){
		return getSessionUser(request).getUid();
	}
	
	public SessionUser getSessionUser(HttpServletRequest request) {
		return (SessionUser) request.getSession().getAttribute(SESSION_KEY);
	}
	
	public void setSessionUser(HttpServletRequest request, SessionUser sessionUser){
		request.getSession().setAttribute(SESSION_KEY, sessionUser);
	}
	
	public void removeSession(HttpServletRequest request, String sessionKey) {
		request.getSession().removeAttribute(sessionKey);
	}
	
	protected void sendError(HttpServletRequest request, HttpServletResponse response, String errorCode) throws IOException{
		String msg = messageSource.getMessage(errorCode, null, getLocale(request));

		response.addHeader("parox_error", URLEncoder.encode(msg, "utf-8"));

		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, errorCode);
	}
	
	/**
	 * 国际化
	 * @param request
	 * @return
	 */
	private Locale getLocale(HttpServletRequest request){
		LocaleResolver localeResolver = RequestContextUtils	.getLocaleResolver(request);
		if (localeResolver != null) {
			return localeResolver.resolveLocale(request);
		}
		return null;
	}
}
