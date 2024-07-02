import {getOrganizations, getOrganizationCount} from "@/src/query/organization.query";
import {Organization} from "@/src/feature/organization/Organization";
import {redirect} from "next/navigation";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {PenBox, Search} from "lucide-react";
import {getAuthSession} from "@/lib/auth";
import {Input} from "@/components/ui/input";
import {SearchInput} from "@/src/feature/SearchInput";

export default async function Page({searchParams} : {
    searchParams: { [key: string]: string | undefined}
}) {
    const session = await getAuthSession();

    const pageLength = 6;

    const page = parseInt(searchParams['page'] || "1");

    const search = searchParams['search'];

    if (isNaN(page) || page < 1) {
        throw new Error("Invalid page number");
    }

    const organizations = await getOrganizations(page, pageLength, search?.trim(), [{name: 'asc'}]);

    const organizationCount = await getOrganizationCount(search?.trim());

    // Vérifier si la page demandée est valide
    if (organizationCount - (pageLength * (page - 1)) < 0) {
        redirect("/organizations")
    }

    console.log(organizationCount, pageLength, page + 1, Math.ceil(organizationCount / pageLength));

    return (
        <>
            <div className="flex flex-row gap-4 justify-between mb-5">
                <h1 className="font-bold text-2xl">Organismes</h1>
                {session?.user ? (
                    <Link href="/organizations/create" className={buttonVariants({
                        variant: "outline",
                    })}>
                        <PenBox size={20}/>
                    </Link>
                ) : null}
            </div>
            <SearchInput defaultValue={search} nbResults={organizationCount}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {organizations.map((organization: any) => (
                    <Organization organization={organization} isCard={false} key={organization.id}/>
                ))}
            </div>
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`/organizations?page=${page - 1}`}
                                            className={page === 1 ? "pointer-events-none opacity-50" : ""}/>
                    </PaginationItem>
                    {page - 2 >= 1 ? (
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    ) : null}
                    {page - 1 > 0 ? (
                        <PaginationItem>
                            <PaginationLink href={`/organizations?page=${page - 1}`}>{page - 1}</PaginationLink>
                        </PaginationItem>
                    ) : null}
                    <PaginationItem>
                        <PaginationLink href={`/organizations?page=${page}`} isActive={true}>{page}</PaginationLink>
                    </PaginationItem>
                    {page + 1 <= Math.ceil(organizationCount / pageLength) ? (
                        <PaginationItem>
                            <PaginationLink href={`/organizations?page=${page + 1}`}>{page + 1}</PaginationLink>
                        </PaginationItem>
                    ) : null}
                    {page + 2 <= Math.ceil(organizationCount / pageLength) ? (
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    ) : null}
                    <PaginationItem>
                        <PaginationNext href={`/organizations?page=${page + 1}`}
                                        className={page + 1 > Math.ceil(organizationCount / pageLength) ? "pointer-events-none opacity-50" : ""}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}