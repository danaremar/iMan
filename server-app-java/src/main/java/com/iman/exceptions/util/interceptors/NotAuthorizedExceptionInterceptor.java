package com.iman.exceptions.util.interceptors;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.iman.exceptions.util.NotAuthorizedException;

@Provider
public class NotAuthorizedExceptionInterceptor implements ExceptionMapper<NotAuthorizedException>{

	@Override
	public Response toResponse(NotAuthorizedException exception) {
		return Response.status(Response.Status.UNAUTHORIZED).build();
	}
	
}
