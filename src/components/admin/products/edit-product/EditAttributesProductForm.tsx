"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import MultipleSelector, {
  Option,
} from "@/components/ui/extension/multiple-selector";
import { useEffect, useState } from "react";
import { AttributeType, ProductAttributeType } from "@/types/admin/types";
import { baseURL } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

type Props = {};

export default function EditAttributesProductForm({}: Props) {
  const { id: productID } = useParams();

  const [attributesOptions, setAttributesOptions] = useState<Option[]>([]);

  const [selectedAttribute, setSelectedAttribute] = useState<Option | null>(
    null
  );
  const [selectedAttributeDetails, setSelectedAttributeDetails] =
    useState<AttributeType | null>(null);
  const [
    selectedAttributeDetailsPropsForm,
    setSelectedAttributeDetailsPropsForm,
  ] = useState<
    {
      attribute_name: string;
      value: string;
    }[]
  >([]);

  const [productAttributes, setProductAttributes] = useState<
    ProductAttributeType[]
  >([]);

  async function loadProductAttributes() {
    try {
      const response = await fetch(
        `${baseURL}/product/get-attributes/${productID}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
          },
        }
      );
      const data = await response.json();
      const attrs: ProductAttributeType[] =
        data?.productAttributes?.attributes || [];

      const formattedAttrs = attrs.map((a) => ({
        ...a,
        properties: Object.entries(a.properties[0]).map(([key, value]) => ({
          attribute_name: key,
          value,
        })),
      }));

      setProductAttributes(formattedAttrs);
    } catch (error) {
      console.error("Error retrieving data:", error);
      // throw new Error("Could not get data");
    }
  }
  console.log({ productAttributes });
  async function loadAttributes() {
    try {
      const response = await fetch(`${baseURL}/attributes/list`, {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      const data = await response.json();
      const attrs: AttributeType[] = data?.list || [];
      console.log(data);
      setAttributesOptions(
        attrs?.map(({ _id, groupName }) => ({ label: groupName, value: _id }))
      );
    } catch (error) {
      console.error("Error retrieving data:", error);
      // throw new Error("Could not get data");
    }
  }

  async function loadAttributeDetail(id: string) {
    try {
      const response = await fetch(`${baseURL}/attributes/detail/${id}`, {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
        },
      });
      const data = await response.json();
      setSelectedAttributeDetails(data?.attribute || null);
    } catch (error) {
      console.error("Error retrieving data:", error);
      // throw new Error("Could not get data");
    }
  }

  useEffect(() => {
    loadProductAttributes();
    loadAttributes();
  }, []);

  useEffect(() => {
    if (selectedAttribute) loadAttributeDetail(selectedAttribute.value);
    else setSelectedAttributeDetails(null);
  }, [selectedAttribute]);

  useEffect(() => {
    if (selectedAttributeDetails) {
      setSelectedAttributeDetailsPropsForm(
        selectedAttributeDetails.properties.map((prop) => ({
          attribute_name: prop,
          value: "",
        }))
      );
    }
  }, [selectedAttributeDetails]);

  async function updateAttributes() {
    try {
      const updatedAttributes = productAttributes.map((p_att) => ({
        ...p_att,
        properties: [
          p_att.properties.reduce((acc, curr) => {
            acc[curr.attribute_name] = curr.value;
            return acc;
          }, {} as { [key: string]: string }),
        ],
      }));

      const result =
        selectedAttributeDetails &&
        selectedAttributeDetailsPropsForm.reduce((acc, curr) => {
          acc[curr.attribute_name] = curr.value;
          return acc;
        }, {} as { [key: string]: string });

      const newAttribute = selectedAttributeDetails && {
        id: selectedAttributeDetails?._id,
        properties: [result],
      };

      const body = {
        attributes:
          selectedAttributeDetails && newAttribute
            ? [...updatedAttributes, newAttribute]
            : updatedAttributes,
      };
      console.log(body);

      const response = await fetch(
        `${baseURL}/product/update-attributes/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV0a2Fyc2h2OTk1QGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2ODU2YWJlOTQ1ZWFmYTQyZjJhYmZlMyIsIm5hbWUiOiJVdGthcnNoIiwibW9iaWxlTm8iOjk5OTk5OTk5OTksImlhdCI6MTcyMjE1MDY4OSwiZXhwIjoxNzIyMjM3MDg5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAifQ.AAnWvVPuj4l6AsOT-9OcDCXVQNLvmTuWLC5Q4enpPxA",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSelectedAttribute(null);
        setSelectedAttributeDetails(null);
        loadProductAttributes();
      }
      console.log("AFTER UPDATE: ", { data });
    } catch (error) {
      console.error("Error retrieving data:", error);
      // throw new Error("Could not get data");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SECTION FOR ALREADY ADDED ATTRIBUTES TO THE PRODUCT */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Attributes</h2>

        {productAttributes.map(({ id, groupName, properties }) => (
          <div className="flex flex-col gap-2">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="dimensions">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Button
                      className="w-7 h-7"
                      size={"icon"}
                      variant={"destructive"}
                      onClick={() =>
                        setProductAttributes((prev) =>
                          prev.filter((p) => p.id !== id)
                        )
                      }
                    >
                      <Minus />
                    </Button>
                    <p className="text-sm font-bold">{groupName || id}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2 flex flex-col gap-3">
                  <Table className="rounded-md border max-w-96">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attribute Name</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((e) => (
                        <TableRow key={e.attribute_name}>
                          <TableCell className="font-medium">
                            {e.attribute_name}
                          </TableCell>
                          <TableCell className="font-medium">
                            <Input
                              placeholder="222"
                              value={e.value}
                              onChange={(event) => {
                                const newVal = event.target.value;

                                setProductAttributes((prev) => {
                                  return [
                                    ...prev.map((p) => {
                                      if (p.id === id) {
                                        return {
                                          ...p,
                                          properties: p.properties.map(
                                            (prop) => {
                                              if (
                                                prop.attribute_name ===
                                                e.attribute_name
                                              )
                                                return {
                                                  attribute_name:
                                                    prop.attribute_name,
                                                  value: newVal,
                                                };
                                              return prop;
                                            }
                                          ),
                                        };
                                      }
                                      return p;
                                    }),
                                  ];
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Add Attribute</h2>

        <div className="flex flex-col gap-1">
          <h4 className="text-sm">Select Attribute</h4>
          <div className="max-w-[500px] flex gap-3">
            <MultipleSelector
              options={attributesOptions.filter(
                (a) =>
                  a.value !==
                  productAttributes.find((p) => p.id === a.value)?.id
              )}
              onChange={(options) => {
                setSelectedAttribute(options[0]);
              }}
              value={selectedAttribute ? [selectedAttribute] : []}
              placeholder="Select Attribute"
              maxSelected={1}
            />
          </div>
        </div>
        {selectedAttributeDetails && (
          <div className="flex flex-col gap-1">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="dimensions">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">
                      {selectedAttributeDetails.groupName}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2 flex flex-col gap-3">
                  <Table className="rounded-md border max-w-96">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attribute Name</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedAttributeDetailsPropsForm.map((e) => (
                        <TableRow key={e.attribute_name}>
                          <TableCell className="font-medium">
                            {e.attribute_name}
                          </TableCell>
                          <TableCell className="font-medium">
                            <Input
                              placeholder="222"
                              value={e.value}
                              onChange={(event) => {
                                const val = event.target.value;
                                setSelectedAttributeDetailsPropsForm((prev) => {
                                  return [
                                    ...prev.map((p) => {
                                      if (p.attribute_name === e.attribute_name)
                                        return { ...p, value: val };
                                      return p;
                                    }),
                                  ];
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <Button onClick={updateAttributes}>Update Attributes</Button>
      </div>
    </div>
  );
}
