import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


function DemoForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "krunal",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      reset();
    } catch (error) {
      setError("root", {
        message: "This email is alreadysss Taken",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="fullName">Full Name</label>
          <input
            {...register("fullName")}
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="role">Role</label>
          <select
            {...register("role")}
            id="role"
            name="role"
            style={{
              display: "block",
              width: "100%",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            disabled={isSubmitting}
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default DemoForm;
