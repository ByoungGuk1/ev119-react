import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:10000";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const [rows, setRows] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [sortKey, setSortKey] = useState("createdAt"); 
  const [sortDir, setSortDir] = useState("desc");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [selected, setSelected] = useState(null);


  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  });


  const loadStaff = async () => {
    try {
      setError("");
      setLoading(true);

      const qs = statusFilter === "ALL" ? "" : `?status=${statusFilter}`;
      const url = `${BACKEND_URL}/api/admin/staff${qs}`;

      const res = await fetch(url, {
        method: "GET",
        headers: authHeaders(),
      });

      const text = await res.text().catch(() => "");
      if (!res.ok) throw new Error(text || `목록 조회 실패 (${res.status})`);

      const json = text ? JSON.parse(text) : {};
      const list = (json.data ?? []).map((s) => ({
        id: s.id,
        type: "STAFF",
        name: s.memberName ?? "-",
        email: s.memberEmail ?? "-",
        status: s.staffStatus, 
        licenseNumber: s.licenseNumber ?? "-",
        createdAt: "-", 
      }));

      setRows(list);
    } catch (e) {
      setRows([]);
      setError(e?.message || "목록 조회 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadStaff();
  }, [statusFilter]);

 
  const patchStatus = async (id, action) => {
    const url = `${BACKEND_URL}/api/admin/staff/${id}/${action}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: authHeaders(),
    });

    const text = await res.text().catch(() => "");
    console.log("[ADMIN PATCH]", action, res.status, text);

    if (!res.ok) throw new Error(text || `${action} 실패 (${res.status})`);
    return text;
  };

  const handleApprove = async (row) => {
    const ok = window.confirm(`${row.name} 의료진 신청을 승인할까요?`);
    if (!ok) return;

    try {
      setError("");
      setLoading(true);
      await patchStatus(row.id, "approve");
      await loadStaff(); 
      setSelected(null);
    } catch (e) {
      setError(e?.message || "승인 처리 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (row) => {
    const ok = window.confirm(`${row.name} 의료진 신청을 거절할까요?`);
    if (!ok) return;

    try {
      setError("");
      setLoading(true);
      await patchStatus(row.id, "reject");
      await loadStaff(); 
      setSelected(null);
    } catch (e) {
      setError(e?.message || "거절 처리 실패");
    } finally {
      setLoading(false);
    }
  };

  const kpi = useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((r) => r.status === "PENDING").length;
    const approved = rows.filter((r) => r.status === "APPROVED").length;
    const rejected = rows.filter((r) => r.status === "REJECTED").length;
    return { total, pending, approved, rejected };
  }, [rows]);


  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return rows.filter((r) => {
      if (!k) return true;
      return (
        (r.name ?? "").toLowerCase().includes(k) ||
        (r.email ?? "").toLowerCase().includes(k) ||
        (r.licenseNumber ?? "").toLowerCase().includes(k) ||
        String(r.id).includes(k)
      );
    });
  }, [rows, keyword]);


  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  useEffect(() => {
    setPage(1);
  }, [keyword, statusFilter]);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const openDetail = (row) => setSelected(row);
  const closeDetail = () => setSelected(null);

  const goAdminMap = () => navigate("/admin/monitor");

  return (
    <S.Container>
      <S.TopBar>
        <S.Brand>
          <S.Logo>EV119</S.Logo>
          <S.Subtitle>관리자 대시보드</S.Subtitle>
        </S.Brand>

        <S.TopActions>
          <S.GhostButton type="button" onClick={() => navigate("/")}>
            🏠 사용자 화면
          </S.GhostButton>
        </S.TopActions>
      </S.TopBar>

      <S.Main>
        {error && (
          <div style={{ padding: 12 }}>
            <b style={{ color: "tomato" }}>{error}</b>
          </div>
        )}
        {loading && (
          <div style={{ padding: 12 }}>
            <span>로딩중...</span>
          </div>
        )}

        <S.KpiGrid>
          <S.KpiCard>
            <S.KpiLabel>현재 목록</S.KpiLabel>
            <S.KpiValue>{kpi.total}</S.KpiValue>
          </S.KpiCard>

          <S.KpiCard $accent="warn">
            <S.KpiLabel>승인 대기</S.KpiLabel>
            <S.KpiValue>{kpi.pending}</S.KpiValue>
          </S.KpiCard>

          <S.KpiCard $accent="ok">
            <S.KpiLabel>승인 완료</S.KpiLabel>
            <S.KpiValue>{kpi.approved}</S.KpiValue>
          </S.KpiCard>

          <S.KpiCard $accent="bad">
            <S.KpiLabel>거절</S.KpiLabel>
            <S.KpiValue>{kpi.rejected}</S.KpiValue>
          </S.KpiCard>
        </S.KpiGrid>

        <S.Panel>
          <S.PanelTitle>의료진 신청 관리</S.PanelTitle>

          <S.Filters>
            <S.SearchBox>
              <S.SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색: 이름, 이메일, 면허번호, ID"
              />
              <S.SearchIcon>🔎</S.SearchIcon>
            </S.SearchBox>

            <S.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="상태 필터"
            >
              <option value="ALL">전체</option>
              <option value="PENDING">승인 대기</option>
              <option value="APPROVED">승인 완료</option>
              <option value="REJECTED">거절</option>
            </S.Select>

            <S.SmallHint>
              총 <b>{sorted.length}</b>건
            </S.SmallHint>

            <S.GhostButton type="button" onClick={loadStaff}>
              새로고침
            </S.GhostButton>
          </S.Filters>

          <S.TableWrap>
            <S.Table>
              <thead>
                <tr>
                  <S.Th onClick={() => toggleSort("id")} $clickable>
                    ID {sortKey === "id" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </S.Th>
                  <S.Th onClick={() => toggleSort("name")} $clickable>
                    이름{" "}
                    {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </S.Th>
                  <S.Th onClick={() => toggleSort("email")} $clickable>
                    이메일{" "}
                    {sortKey === "email" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </S.Th>
                  <S.Th>면허번호</S.Th>
                  <S.Th onClick={() => toggleSort("status")} $clickable>
                    상태{" "}
                    {sortKey === "status" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </S.Th>
                  <S.Th onClick={() => toggleSort("createdAt")} $clickable>
                    신청일{" "}
                    {sortKey === "createdAt"
                      ? sortDir === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </S.Th>
                  <S.Th>작업</S.Th>
                </tr>
              </thead>

              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <S.Td colSpan={7}>
                      <S.Empty>조건에 맞는 데이터가 없어요.</S.Empty>
                    </S.Td>
                  </tr>
                ) : (
                  paged.map((r) => (
                    <tr key={r.id}>
                      <S.Td>{r.id}</S.Td>
                      <S.Td>
                        <S.NameCell>
                          <S.Avatar>{(r.name ?? "-").slice(0, 1)}</S.Avatar>
                          <span>{r.name}</span>
                        </S.NameCell>
                      </S.Td>
                      <S.Td>{r.email}</S.Td>
                      <S.Td>{r.licenseNumber}</S.Td>
                      <S.Td>
                        <S.StatusBadge $status={r.status}>
                          {r.status === "PENDING"
                            ? "승인 대기"
                            : r.status === "APPROVED"
                            ? "승인 완료"
                            : "거절"}
                        </S.StatusBadge>
                      </S.Td>
                      <S.Td>{r.createdAt}</S.Td>
                      <S.Td>
                        <S.RowActions>
                          <S.RowButton type="button" onClick={() => openDetail(r)}>
                            상세
                          </S.RowButton>

                          {r.status === "PENDING" ? (
                            <>
                              <S.RowButton
                                type="button"
                                $variant="ok"
                                onClick={() => handleApprove(r)}
                              >
                                승인
                              </S.RowButton>
                              <S.RowButton
                                type="button"
                                $variant="bad"
                                onClick={() => handleReject(r)}
                              >
                                거절
                              </S.RowButton>
                            </>
                          ) : (
                            <S.RowButton
                              type="button"
                              $variant="ghost"
                              onClick={() => openDetail(r)}
                              title="상세 보기"
                            >
                              보기
                            </S.RowButton>
                          )}
                        </S.RowActions>
                      </S.Td>
                    </tr>
                  ))
                )}
              </tbody>
            </S.Table>
          </S.TableWrap>

          <S.Pagination>
            <S.PageBtn
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              이전
            </S.PageBtn>

            <S.PageInfo>
              {page} / {totalPages}
            </S.PageInfo>

            <S.PageBtn
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              다음
            </S.PageBtn>
          </S.Pagination>
        </S.Panel>
      </S.Main>

      {selected && (
        <S.ModalOverlay onClick={closeDetail}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>신청 상세</S.ModalTitle>
              <S.ModalClose type="button" onClick={closeDetail}>
                ✕
              </S.ModalClose>
            </S.ModalHeader>

            <S.ModalBody>
              <S.DetailRow>
                <span>ID</span>
                <b>{selected.id}</b>
              </S.DetailRow>
              <S.DetailRow>
                <span>이름</span>
                <b>{selected.name}</b>
              </S.DetailRow>
              <S.DetailRow>
                <span>이메일</span>
                <b>{selected.email}</b>
              </S.DetailRow>
              <S.DetailRow>
                <span>면허번호</span>
                <b>{selected.licenseNumber}</b>
              </S.DetailRow>
              <S.DetailRow>
                <span>상태</span>
                <S.StatusBadge $status={selected.status}>
                  {selected.status === "PENDING"
                    ? "승인 대기"
                    : selected.status === "APPROVED"
                    ? "승인 완료"
                    : "거절"}
                </S.StatusBadge>
              </S.DetailRow>
              <S.DetailRow>
                <span>신청일</span>
                <b>-</b>
              </S.DetailRow>
            </S.ModalBody>

            <S.ModalFooter>
              {selected.status === "PENDING" ? (
                <>
                  <S.PrimaryBtn type="button" onClick={() => handleApprove(selected)}>
                    승인 처리
                  </S.PrimaryBtn>
                  <S.DangerBtn type="button" onClick={() => handleReject(selected)}>
                    거절 처리
                  </S.DangerBtn>
                </>
              ) : (
                <S.GhostButton type="button" onClick={closeDetail}>
                  닫기
                </S.GhostButton>
              )}
            </S.ModalFooter>
          </S.Modal>
        </S.ModalOverlay>
      )}

      <S.Footer />
    </S.Container>
  );
};

export default AdminDashboard;
