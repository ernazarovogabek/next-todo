"use client";

import { FormData, UserType } from "@/@types";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    console.log("Fetching from:", process.env.NEXT_PUBLIC_API_URL);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      cache: "no-store",
    });
    if (!data.ok) {
      console.error("Fetch failed with status:", data.status);
      return [];
    }
    const res = await data.json();
    console.log("Fetched users:", res);
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUsers = async (data: FormData) => {
  try {
    console.log("Adding user:", data);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const userData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("Response status:", post.status);
    const responseText = await post.text();
    console.log("Response:", responseText);
    
    if (!post.ok) {
      throw new Error(`Failed to add user: ${post.status} - ${responseText}`);
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!deleteResponse.ok) {
      throw new Error("Failed to delete user");
    }
    return await deleteResponse.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (id: number, data: FormData) => {
  try {
    const userData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    const update = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!update.ok) {
      throw new Error("Failed to update user");
    }
    return await update.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
