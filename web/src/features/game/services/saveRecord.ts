import { supabase } from "@/features/auth/services/supabaseClient";

export async function saveRecord(userId: string, record: number) {
    const { error } = await supabase
        .from("Users")
        .upsert({ id: userId, record }, { onConflict: "id" });

    if (error) {
        console.error("Error saving record:", error);
    }
}
