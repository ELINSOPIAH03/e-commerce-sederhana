import { useState } from "react";
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import StatsCard from '../components/StatsCard'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/solid'

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

    const getCompletionPercentage = () => {
        if (tasks.length === 0) return "0%";
        return `${Math.round((finishedTasks.length / tasks.length) * 100)}%`;
    };

    return (
        <>
            <div className="min-h-full">
                <Navbar />
                <Header title="Shopping Todo List" />
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-6">
                        <div className="flex w-full flex-wrap items-start gap-4">
                            <StatsCard title="Total Items to Buy" value={unfinishedTasks.length.toString()} />
                            <StatsCard title="Total Items Purchased" value={finishedTasks.length.toString()} />
                            <StatsCard title="Completion Percentage"
                                value={getCompletionPercentage()} />
                        </div>

                        <div className="border border-slate-300 rounded-lg bg-white p-7">
                            <div className="flex gap-4 w-full ">
                                <input
                                    className="w-4/6 sm:w-10/12 form-control grey"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Add a new item..."
                                />
                                <button
                                    className="btn-bg add w-full"
                                    onClick={handleAddTask}>
                                    <span className="block sm:hidden">+</span>
                                    <span className="hidden sm:block">Add</span>
                                </button>
                            </div>

                            <h2 className="text-xl font-medium py-6">Not Purchased</h2>
                            <ul className="border border-slate-300 rounded-lg">
                                {unfinishedTasks.length === 0 ? (
                                    <div className="flex flex-col w-full gap-4 justify-center m-2 lg:m-7 items-center">
                                        <ShoppingCartIcon aria-hidden="true" className="size-15 sm:size-20 text-gray-400" />
                                        <p className="text-sm lg:text-xl text-gray-400 text-center">Your shopping list is empty. Start adding items!</p>
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
                                            onClick={() => handleDeleteTask(task.id)}>
                                            <TrashIcon aria-hidden="true" className="size-4 sm:size-6 text-rose-700" />
                                        </button>
                                    </li>
                                ))
                                )}
                            </ul>

                            <h2 className="text-xl font-medium py-6">Purchased </h2>
                            <ul className="border border-slate-300 rounded-lg">
                                {finishedTasks.length === 0 ? (
                                    <div className="flex flex-col w-full gap-4 justify-center m-2 lg:m-7 items-center">
                                        <ShoppingCartIcon aria-hidden="true" className="size-15 sm:size-20 text-gray-400" />
                                        <p className="text-sm lg:text-xl text-gray-400 text-center">Your purchased list is still empty</p>
                                    </div>
                                ) : (finishedTasks.map((task) => (
                                    <li
                                        className="p-4 w-full flex justify-between items-center border-b border-slate-300 last:border-b-0 g-2"
                                        key={task.id}>
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
                                            onClick={() => handleDeleteTask(task.id)}>
                                            <TrashIcon aria-hidden="true" className="size-4 sm:size-6 text-rose-700" />
                                        </button>
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
