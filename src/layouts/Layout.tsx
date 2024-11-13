import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import Notification from "../components/Notification";

export default function Layout() {
  const { loadFromStorage } = useAppStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet />
      </main>
      {/* MODAL se MOSTRATA en inicio y favoritos */}
      <Modal />
      <Notification />
    </>
  );
}
