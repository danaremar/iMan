package com.iman.config;

public class ImanMessages {

	private ImanMessages() {
	}

	// USER
	public static final String USER_NOT_FOUND_MESSAGE = "User doesn't found";
	public static final String USER_DUPLICATED_EMAIL_MESSAGE = "Email is duplicated";
	public static final String USER_USERNAME_DUPLICATED_MESSAGE = "Username is duplicated";
	public static final String USER_DISABLED_MESSAGE = "User has been disabled";
	public static final String USER_NOT_ALLOWED = "Your user isn't allowed to perform this operation";
	public static final String USER_OLD_PASSWORD_INCORRECT = "Old password doesn't match with actual";
	
	// KANBAN
	public static final String KANBAN_NOT_CONTAINED_IN_SPRINT_MESSAGE = "Sprint columns are not contained in the same sprint";
	public static final String KANBAN_COLUMN_DONT_EXISTS_MESSAGE = "Column don't exists";
	public static final String KANBAN_COLUMNS_DONT_RELATED_MESSAGE = "Columns are not related in the same Sprint";
	public static final String KANBAN_COLUMN_CANNOT_BE_DELETED_MESSAGE = "Column can't be delete if contains tasks";
	public static final String KANBAN_TASK_IS_NOT_CONTAINED_IN_SPRINT = "Task is not contained in this sprint";
	public static final String KANBAN_TASK_USERS_NOT_RELATED_WITH_PROJECT = "Username is not related with project";

}
