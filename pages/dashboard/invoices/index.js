import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import { doObjToFormData, format_amount, format_date, formatDateToNewYorkTimezone, invoiceStatus } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { useRouter } from "next/router";
import Text from "@/components/components/text";
import ExportInvoicePdf from "@/components/components/invoice-download";
const ITEMS_PER_PAGE = 12;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookieHeader = req.headers.cookie || '';
  const cookieValue = parse(cookieHeader);
  const authToken =
    cookieValue['authToken'] !== undefined &&
    cookieValue['authToken'] !== null &&
    cookieValue['authToken'] !== ''
      ? cookieValue['authToken']
      : null;
  const result = await http
    .post("invoices-all", doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function invoices({result}) {
  const {invoices}=result
//   console.log(invoices);
  const site_settings = useSelector(state => state.user.site_settings);
  const memberRow = site_settings?.member;
  const router = useRouter();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
    const handleActionClick = () => {
      setActiveDropdown(null);
    };
    const handlePrint = () => {
      window.print();
    };

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(invoices?.length / ITEMS_PER_PAGE);

    // Get the invoices for the current page
    const currentInvoices = invoices?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
  return (
    <>
    <MetaGenerator page_title={"My Invoices- " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner">
              <h3>My Invoices</h3>
            </div>
          </div>
        </section>

        <section id="listing">
          <div className="contain">
          {invoices?.length > 0 ? 
            <div className="outer">
              <div className="lst head">
                <ul>
                  <li>Invoice ID</li>
                  <li>Doctor's Note</li>
                  <li>Date</li>
                  <li>Status</li>
                </ul>
              </div>
              {
                currentInvoices?.map((invoice, index) => (
                <div className="lst long_lst">
                  <ul>
                    <li>#{invoice?.invoice_id}</li>
                    
                    <li>
                        {invoice?.additional_note ? 
                        <Text string={invoice?.additional_note} length={80}/>
                        :
                        "NA"
                        }
                    </li>
                    <li>{formatDateToNewYorkTimezone(invoice?.created_at)}</li>
                    <li>{invoiceStatus(invoice?.status)}</li>
                    <li className="bTn action_drop_lease" key={invoice.id}>
                      <div className="action_drop _dropDown" ref={(el) => (dropdownRefs.current[index] = el)}>
                        <div
                          className="_dropBtn action_dots"
                          onClick={() => toggleDropdown(index)}>
                          <img src="/images/dots.svg" alt="Actions" />
                        </div>
                        <ul className={`_dropCnt dropLst ${activeDropdown === index ? "show" : "hide"}`}>
                          <li>
                            <Link href={`/dashboard/invoices/view/${invoice?.encoded_id}`}>View</Link>
                          </li>
                          <li>
                            <ExportInvoicePdf invoice_id={invoice?.id} is_list_view={true} />
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                ))
              }
              
            </div>
            :
            <div className="error_msg_blk">
              <h4>No invoices found</h4>
            </div>
            }

            {/* Pagination */}
            {invoices?.length > ITEMS_PER_PAGE && (
              <div className="pagination tex-center">
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    className={currentPage === page + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
invoices.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
