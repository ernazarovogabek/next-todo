"use client";
import { UserType } from "@/@types";
import { deleteUser } from "@/service";
import React, { FC, useState } from "react";

interface CardProps extends UserType {
  onEdit: (user: UserType) => void;
  onDelete: () => void;
}

const Card: FC<CardProps> = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUsersFromApi = async () => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      setIsDeleting(true);
      try {
        await deleteUser(props.id);
        props.onDelete();
      } catch (error) {
        alert("O'chirishda xatolik yuz berdi");
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    props.onEdit({ id: props.id, name: props.name, surname: props.surname });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 sm:mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            {props.name} {props.surname}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">ID: #{props.id}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Tahrirlash
          </button>
          <button
            onClick={deleteUsersFromApi}
            disabled={isDeleting}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs sm:text-sm font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none"
          >
            {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
