"use client";
import Card from "@/components/card";
import Form from "@/components/form";
import { getUsers } from "@/service";
import React, { useState, useEffect } from "react";
import { UserType } from "@/@types";

const About = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-4 px-3 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-3 sm:py-8 sm:px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-gray-800 dark:text-white">
            Foydalanuvchilar boshqaruvi
          </h1>
          
          <Form editingUser={editingUser} setEditingUser={setEditingUser} onSuccess={loadUsers} />
          
          <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-gray-300 dark:border-gray-600">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
              Qo'shilgan foydalanuvchilar ({users.length})
            </h2>
            
            {users.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Hozircha foydalanuvchilar yo'q
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {users.map((value) => (
                  <Card key={value.id} {...value} onEdit={setEditingUser} onDelete={loadUsers} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
