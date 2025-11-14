import React, { useState } from "react";
// import { div, div } from "@/components/ui/div";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const AssignPage: React.FC = () => {
  const [tab, setTab] = useState("individual");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Amit Kumar" },
  ];

  const teams = [
    { id: "t1", name: "QA Team" },
    { id: "t2", name: "AI Team" },
    { id: "t3", name: "Backend Team" },
  ];

  const handleCheckbox = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Tabs Header */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger
            value="individual"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
          >
            Individual
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
          >
            Team
          </TabsTrigger>
        </TabsList>

        {/* Individual Tab */}
        <TabsContent value="individual">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Search + User List */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Search User
                  </h3>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  type="text"
                  placeholder="Search by name..."
                  className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"

                />

                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-6">
                        <Checkbox
                          checked={selectedUsers.includes(u.id)}
                          onCheckedChange={() => handleCheckbox(u.id)}
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                          {u.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Assign Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assign Task
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Task */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Task
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Task" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="task1">Task 1</SelectItem>
                        <SelectItem value="task2">Task 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Task Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Task Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Task Name"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Start Time
                    </label>
                    <Input
                      type="time"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      End Time
                    </label>
                    <Input
                      type="time"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Client
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="c1">Client A</SelectItem>
                        <SelectItem value="c2">Client B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Site */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Site
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Site" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="s1">Site 1</SelectItem>
                        <SelectItem value="s2">Site 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Form */}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Form
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Form" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="f1">Form A</SelectItem>
                        <SelectItem value="f2">Form B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                <div className="flex justify-end">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Search + Team List */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Search Teams
                </h3>
                <Input
                  type="text"
                  placeholder="Search by team name..."
                  className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                />
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {teams.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedUsers.includes(t.id)}
                          onCheckedChange={() => handleCheckbox(t.id)}
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                          {t.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Assign Table */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-white dark:bg-gray-800 p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assign Task
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Task */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Task
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Task" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="task1">Task 1</SelectItem>
                        <SelectItem value="task2">Task 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Task Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Task Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Task Name"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Start Time
                    </label>
                    <Input
                      type="time"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      End Time
                    </label>
                    <Input
                      type="time"
                      className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl"
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Client
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="c1">Client A</SelectItem>
                        <SelectItem value="c2">Client B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Site */}
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Site
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Site" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="s1">Site 1</SelectItem>
                        <SelectItem value="s2">Site 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Form */}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 block">
                      Form
                    </label>
                    <Select>
                      <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20 rounded-xl">
                        <SelectValue placeholder="Select Form" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                        <SelectItem value="f1">Form A</SelectItem>
                        <SelectItem value="f2">Form B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignPage;
