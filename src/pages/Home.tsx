import { useState } from "react";
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

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
                <Header title="Todo Belanjaan" />
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
                        <div className="border border-slate-300 rounded-lg bg-white p-7">

                            <div className="flex gap-4 w-full ">
                                <input
                                    className="w-4/6 sm:w-10/12 form-control grey"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tambah belanjaan..."
                                />
                                <button 
                                    className="btn-bg add w-full"
                                    onClick={handleAddTask}>
                                        <span className="block sm:hidden">+</span>
                                        <span className="hidden sm:block">Tambah</span>
                                    </button>
                            </div>

                            <h2 className="text-xl font-medium py-6">Belum Dibeli</h2>
                            <ul className="border border-slate-300 rounded-lg">
                                {unfinishedTasks.length === 0 ? (
                                    <div className="flex flex-col w-full gap-4 justify-center m-2 lg:m-7 items-center">
                                        <ShoppingCartIcon aria-hidden="true" className="size-15 sm:size-20 text-gray-400" />
                                        <p className="text-sm lg:text-xl text-gray-400 text-center">Belum ada barang yang akan dibeli.</p>
                                    </div>
                                ) : (unfinishedTasks.map((task) => (
                                    <li key={task.id}
                                        className="p-4 w-full flex justify-between items-center border-b border-slate-300 last:border-b-0 g-2">
                                        <div className="flex gap-4 items-center text-sm lg:text-base font-medium">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleTask(task.id)}
                                            />
                                            {task.name}
                                        </div>
                                        <button
                                            className="btn-dell text-xs lg:text-base" 
                                            onClick={() => handleDeleteTask(task.id)}>Hapus</button>
                                    </li>
                                ))
                                )}
                            </ul>

                            <h2 className="text-xl font-medium py-6">Sudah Dibeli</h2>
                            <ul className="border border-slate-300 rounded-lg">
                                {finishedTasks.length === 0 ? (
                                    <div className="flex flex-col w-full gap-4 justify-center m-2 lg:m-7 items-center">
                                        <ShoppingCartIcon aria-hidden="true" className="size-15 sm:size-20 text-gray-400" />
                                        <p className="text-sm lg:text-xl text-gray-400 text-center">Belum ada barang yang sudah dibeli.</p>
                                    </div>
                                    ) : (finishedTasks.map((task) => (
                                        <li 
                                            className="p-4 w-full flex justify-between items-center border-b border-slate-300 last:border-b-0 g-2"
                                            key={task.id}>
                                            <div className="flex gap-4 items-center text-sm lg:text-base font-medium" style={{ textDecoration: "line-through" }}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => handleToggleTask(task.id)}
                                                />
                                                {task.name}
                                            </div>
                                            <button 
                                                className="btn-dell text-xs lg:text-base" 
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
