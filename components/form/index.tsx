"use client";
import { FormData, UserType } from "@/@types";
import { addUsers, updateUser } from "@/service";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

interface FormProps {
  editingUser: UserType | null;
  setEditingUser: (user: UserType | null) => void;
  onSuccess: () => void;
}

const Form = ({ editingUser, setEditingUser, onSuccess }: FormProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (editingUser) {
      setValue("name", editingUser.name);
      setValue("surname", editingUser.surname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      reset();
    }
  }, [editingUser, setValue, reset]);

  const submit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
        setSubmitMessage("Ma'lumot muvaffaqiyatli yangilandi!");
        setEditingUser(null);
      } else {
        console.log("Submitting data:", data);
        await addUsers(data);
        setSubmitMessage("Ma'lumot muvaffaqiyatli qo'shildi!");
      }
      reset();
      onSuccess();
    } catch (error: any) {
      console.error("Submit error:", error);
      setSubmitMessage(`Xatolik: ${error.message || "Qaytadan urinib ko'ring"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    reset();
    setSubmitMessage("");
  };

  return (
    <div>
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
        {editingUser ? `Foydalanuvchi #${editingUser.id} ni tahrirlash` : "Yangi foydalanuvchi qo'shish"}
      </h2>
      
      <form onSubmit={handleSubmit(submit)} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ism
          </label>
          <input
            id="name"
            {...register("name", { 
              required: "Ism kiritish majburiy",
              minLength: { value: 2, message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak" }
            })}
            type="text"
            placeholder="Ismingizni kiriting"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {errors.name && (
            <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="surname" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Familiya
          </label>
          <input
            id="surname"
            {...register("surname", { 
              required: "Familiya kiritish majburiy",
              minLength: { value: 2, message: "Familiya kamida 2 ta harfdan iborat bo'lishi kerak" }
            })}
            type="text"
            placeholder="Familiyangizni kiriting"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {errors.surname && (
            <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.surname.message}</p>
          )}
        </div>

        <div className={editingUser ? "flex gap-2 sm:gap-3" : ""}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${editingUser ? "flex-1" : "w-full"} ${editingUser ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400" : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"} text-white text-sm sm:text-base font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isSubmitting ? (editingUser ? "Saqlanmoqda..." : "Yuklanmoqda...") : (editingUser ? "Saqlash" : "Qo'shish")}
          </button>
          
          {editingUser && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white text-sm sm:text-base font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none"
            >
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      {submitMessage && (
        <div className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm ${
          submitMessage.includes("muvaffaqiyatli") 
            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
        }`}>
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default Form;
