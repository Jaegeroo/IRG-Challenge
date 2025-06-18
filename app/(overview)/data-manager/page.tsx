import AllocationTable from "@/components/data-manager/allocation/allocation-table";
import ClientTable from "@/components/data-manager/clients/client-table";
import ConsultantTable from "@/components/data-manager/consultants/consultant-table";
import ProjectTable from "@/components/data-manager/projects/projects-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConsultantPage() {
  return (
    <div>
      <Tabs defaultValue="consultant">
        <TabsList>
          <TabsTrigger value="consultant">Consultant</TabsTrigger>
          <TabsTrigger value="client-and-project">Client & Project</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>
        <TabsContent value="consultant">
          <ConsultantTable />
        </TabsContent>
        <TabsContent
          value="client-and-project"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <ClientTable />
          <ProjectTable />
        </TabsContent>
        <TabsContent value="allocation">
          <AllocationTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
