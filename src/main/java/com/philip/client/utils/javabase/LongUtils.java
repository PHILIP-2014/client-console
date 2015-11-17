package com.philip.client.utils.javabase;

public class LongUtils {
	/**
	 * 禁止实例化
	 */
	private LongUtils() {
		
	}
	
	public static boolean isEmpty(Long arg) {
		if (arg == null || "".equals(arg)) {
			return true;
		}
		return false;
	}
}
