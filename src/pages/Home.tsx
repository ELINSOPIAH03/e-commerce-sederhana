import { useState } from "react";
import Navbar from '../components/Navbar'
import Header from '../components/Header'

import '../scss/components/_button.scss'
import '../scss/components/_input.scss'

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            name: "Kaos Oblong Xl",
            completed: false,
        },
        {
            id: 2,
            name: "Kemeja L",
            completed: false,
        },
    ]);
    const [input, setInput] = useState("");

    const handleAddTask = () => {
        if (input.trim() === "") return;

        const newTask: Task = {
            id: Date.now(),
            name: input.trim(),
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setInput("");
    };

    const handleToggleTask = (id: number) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (id: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    const unfinishedTasks = tasks.filter((task) => !task.completed);
    const finishedTasks = tasks.filter((task) => task.completed);

    return (
        <>
            <div className="min-h-full">
                <Navbar />
                <Header title="Todo Belanjaan 🛒" />
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div style={{ padding: "20px" }}>

                            <div className="flex gap-4 w-full ">
                                <input
                                    className="w-4/6 lg:w-full form-control"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tambah belanjaan..."
                                />
                                <button 
                                    className="btn-bg add w-1/3 lg:w-max sm:w-max"
                                    onClick={handleAddTask}>Tambah</button>
                            </div>

                            <h2 className="text-xl font-medium py-6">Belum Dibeli</h2>
                            <ul>
                                {unfinishedTasks.length === 0 ? (
                                    <p className="text-red-500">Belum ada barang yang akan dibeli.</p>
                                ) : (unfinishedTasks.map((task) => (
                                    <li key={task.id}
                                        className="bg-green-100 p-2 rounded-md w-full flex justify-between items-center mb-2">
                                        <div className="flex gap-4 items-center text-base font-medium">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleTask(task.id)}
                                            />
                                            {task.name}
                                        </div>
                                        <button
                                            className="btn-dell" 
                                            onClick={() => handleDeleteTask(task.id)}>Hapus</button>
                                    </li>
                                ))
                                )}
                            </ul>

                            <h2 className="text-xl font-medium py-6">Sudah Dibeli</h2>
                            <ul>
                                {finishedTasks.length === 0 ? (
                                    <p className="text-red-500">Belum ada barang yang sudah dibeli.</p>
                                    ) : (finishedTasks.map((task) => (
                                        <li 
                                            className="bg-green-100 p-2 rounded-md w-full flex justify-between items-center mb-2"
                                            key={task.id}>
                                            <div className="flex gap-4 items-center text-base font-medium" style={{ textDecoration: "line-through" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => handleToggleTask(task.id)}
                                                />
                                                {task.name}
                                            </div>
                                            <button 
                                                className="btn-dell" 
                                                onClick={() => handleDeleteTask(task.id)}>Hapus</button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
