import ConsultantTable from "@/components/data-manager/consultants/consultant-table";
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
        <TabsContent value="client-and-project">
          Client and Project Table
        </TabsContent>
        <TabsContent value="allocation">Allocation Table</TabsContent>
      </Tabs>
    </div>
  );
}
