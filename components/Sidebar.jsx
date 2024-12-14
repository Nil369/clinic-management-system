"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";

export default function Sidebar({ role, toggleSidebar }) {
  const router = useRouter();

  return (
    // Wrap the SidebarMenu inside SidebarProvider
    <SidebarProvider>
      <SidebarMenu>
        {/* Appointments Section (Common for both Doctor and Receptionist) */}
        <Collapsible defaultOpen className="group/collapsible ">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton onClick={toggleSidebar}>Appointments</SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub >
                <SidebarMenuSubItem className="hover:bg-blue-400 hover:rounded-full hover:px-4 py-2 cursor-pointer" onClick={() => router.push("/admin/appointments")}>View Appointments</SidebarMenuSubItem>
                {role === "receptionist" || (
                  <SidebarMenuSubItem className="hover:bg-blue-400 hover:rounded-full hover:px-3 py-2 cursor-pointer" onClick={() => router.push("/admin/appointments/add")}>Assign Appointments</SidebarMenuSubItem>
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Patients Section (Only for Doctor) */}
        {role === "doctor" || (
          <Collapsible defaultOpen className="group/collapsible ">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={toggleSidebar}>Patients</SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="hover:bg-blue-400 hover:rounded-full hover:px-4 py-2 cursor-pointer" onClick={() => router.push("/admin/prescription")}>Prescription</SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )}

        {/* Staff Section (Only for Receptionist) */}
        {role === "receptionist" || (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={toggleSidebar}>Staff</SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem onClick={() => router.push("/admin/staff")} className="hover:bg-blue-400 hover:rounded-full hover:px-4 py-2 cursor-pointer" >View Staff</SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )}
      </SidebarMenu>
    </SidebarProvider> // Wrap the SidebarMenu with SidebarProvider
  );
}
